from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from oauth2_provider.models import AbstractApplication
from django.utils import timezone


class CustomUserManager(BaseUserManager):
    def create_user(self, mobile_number, email, gst_no, user_name, password=None):
        user = self.model(
            mobile_number=mobile_number,
            gst_no=gst_no,
            user_name=user_name,
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, mobile_number, email, gst_no, user_name, password):
        return self.create_user(mobile_number, email, gst_no, user_name, password)


class User(AbstractBaseUser, PermissionsMixin):
    mobile_number = models.CharField(unique=True)
    email = models.EmailField(blank=True)
    gst_no = models.CharField()
    user_name = models.CharField()
    last_login = models.DateTimeField(default=timezone.now)

    objects = CustomUserManager()

    USERNAME_FIELD = 'mobile_number'
    REQUIRED_FIELDS = ['user_name', 'gst_no', 'email']

    def __str__(self):
        return self.mobile_number


class Application(AbstractApplication):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
