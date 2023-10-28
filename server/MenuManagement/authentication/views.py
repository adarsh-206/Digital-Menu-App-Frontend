from django.shortcuts import render
from rest_framework import generics
from .models import user
from .serializers import UserSerializer

# Create your views here.


class UserListCreateView(generics.ListCreateAPIView):
    queryset = user.objects.all()
    serializer_class = UserSerializer


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = user.objects.all()
    serializer_class = UserSerializer
