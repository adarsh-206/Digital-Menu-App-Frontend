# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({'token': token, 'msg': 'Registration Successful'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    def post(self, request):
        data = request.data
        email = data.get('email')
        password = data.get('password')
        user = User.objects.filter(email=email).first()
        if user is None or not user.check_password(password):
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        refresh = RefreshToken.for_user(user)
        token = get_tokens_for_user(user)
        return Response({'token': token, 'msg': 'Login Success'}, status=status.HTTP_200_OK)


class UserDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get('refresh_token')

        if not refresh_token:
            return Response({'detail': 'Refresh token is required for logout.'}, status=status.HTTP_BAD_REQUEST)

        try:
            RefreshToken(refresh_token).blacklist()
            return Response({'detail': 'Logout Successful'}, status=status.HTTP_200_OK)
        except Exception:
            return Response({'detail': 'Invalid refresh token or unable to blacklist.'}, status=status.HTTP_BAD_REQUEST)
