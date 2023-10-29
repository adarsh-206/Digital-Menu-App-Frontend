# urls.py
from django.contrib import admin
from django.urls import path
from authentication.views import UserRegistrationView, UserLoginView, UserDetailsView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', UserRegistrationView.as_view(), name='user-register'),
    path('api/user/login/', UserLoginView.as_view(), name='user-login'),
    path('api/user/details/', UserDetailsView.as_view(), name='user-details'),
]
