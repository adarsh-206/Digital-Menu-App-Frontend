from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from oauth2_provider.models import Application
from django.utils import timezone


class CustomUserManager(BaseUserManager):
    def create_user(self, mobile_number, gst_no, email=None, password=None):
        user = self.model(
            mobile_number=mobile_number,
            gst_no=gst_no,
            email=self.normalize_email(email) if email else None,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, mobile_number, gst_no, email=None, password=None):
        return self.create_user(mobile_number, gst_no, email, password)


class User(AbstractBaseUser, PermissionsMixin):
    mobile_number = models.CharField(unique=True, max_length=10)
    email = models.EmailField(blank=True, null=True)
    gst_no = models.CharField(max_length=15)
    last_login = models.DateTimeField(default=timezone.now)

    objects = CustomUserManager()

    USERNAME_FIELD = 'mobile_number'
    REQUIRED_FIELDS = ['gst_no']

    def __str__(self):
        return self.mobile_number
