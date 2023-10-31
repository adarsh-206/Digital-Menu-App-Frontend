from rest_framework import status
from django.utils import timezone
from datetime import timedelta
from rest_framework.response import Response
from rest_framework.views import APIView
from oauth2_provider.models import Application
from oauth2_provider.models import AccessToken, RefreshToken
from .models import User
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
import uuid


class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.create(serializer.validated_data)

        # Revoke existing access and refresh tokens for the user
        AccessToken.objects.filter(user=user).delete()
        RefreshToken.objects.filter(user=user).delete()

        # Create an OAuth2 Application for the user
        application, created = Application.objects.get_or_create(
            user=user,
            authorization_grant_type=Application.GRANT_PASSWORD,
            client_type=Application.CLIENT_CONFIDENTIAL,
        )

        # Generate an access token and refresh token for the user
        access_token = AccessToken.objects.create(
            user=user,
            application=application,
            token=str(uuid.uuid4()),
            expires=timezone.now() + timedelta(minutes=20)
        )
        refresh_token = RefreshToken.objects.create(
            user=user,
            access_token=access_token,
            application=application,
            token=str(uuid.uuid4())
        )

        return Response({
            'access_token': access_token.token,
            'refresh_token': refresh_token.token,
            'msg': 'Registration Successful'
        }, status=status.HTTP_201_CREATED)


class UserLoginView(APIView):
    def post(self, request):
        data = request.data
        email_or_username = data.get('email_or_username')
        password = data.get('password')

        # Check if the provided login field is an email or a username
        if '@' in email_or_username:
            user = User.objects.filter(email=email_or_username).first()
        else:
            user = User.objects.filter(user_name=email_or_username).first()

        if user is None or not user.check_password(password):
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        # Find the OAuth2 Application for the user
        application = Application.objects.filter(user=user).first()

        if not application:
            return Response({'detail': 'OAuth2 Application not found'}, status=status.HTTP_400_BAD_REQUEST)

        # Revoke existing access and refresh tokens for the user
        AccessToken.objects.filter(user=user).delete()
        RefreshToken.objects.filter(user=user).delete()

        # Create OAuth2 tokens
        access_token = AccessToken.objects.create(
            user=user,
            application=application,
            token=str(uuid.uuid4()),
            expires=timezone.now() + timedelta(minutes=20)
        )
        refresh_token = RefreshToken.objects.create(
            user=user,
            access_token=access_token,
            application=application,
            token=str(uuid.uuid4())
        )

        return Response({
            'access_token': access_token.token,
            'refresh_token': refresh_token.token,
            'msg': 'Login Success'
        }, status=status.HTTP_200_OK)


class UserDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response(UserSerializer(user).data, status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Get the user's access token
        user = request.user
        access_token = AccessToken.objects.get(user=user)

        # Revoke the access token (logout)
        access_token.revoke()
        return Response({'detail': 'User logged out'}, status=status.HTTP_200_OK)
