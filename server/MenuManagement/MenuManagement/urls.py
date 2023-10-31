from django.contrib import admin
from django.urls import path, include
from authentication.views import UserRegistrationView, UserLoginView, UserDetailsView, LogoutView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register', UserRegistrationView.as_view(), name='user-register'),
    path('api/user/login', UserLoginView.as_view(), name='user-register'),
    path('api/user/details', UserDetailsView.as_view(), name='user-details'),
    path('api/user/logout', LogoutView.as_view(), name='logout'),
]
