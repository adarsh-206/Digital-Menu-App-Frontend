from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .serializers import UserSerializer


class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            token_data = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
            response_data = {
                'user_id': user.id,
                'business_name': user.business_name,
                'email': user.email,
                'gst_no': user.gst_no,
                'contact_no': user.contact_no,
                'registration_date': user.registration_date,
                'speciality': user.speciality,
                **token_data,
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
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
        token_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        response_data = {
            'user_id': user.id,
            'business_name': user.business_name,
            'email': user.email,
            'gst_no': user.gst_no,
            'contact_no': user.contact_no,
            'registration_date': user.registration_date,
            'speciality': user.speciality,
            **token_data,
        }
        return Response(response_data, status=status.HTTP_200_OK)
