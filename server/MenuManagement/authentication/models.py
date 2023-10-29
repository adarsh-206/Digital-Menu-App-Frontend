from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, business_name, gst_no, contact_no, registration_date, speciality, password, confirm_password):
        if not business_name:
            raise ValueError('The Business Name must be required')
        if not gst_no:
            raise ValueError('The GST No must be required')
        if not contact_no:
            raise ValueError('The Contact No must be required')
        if not registration_date:
            raise ValueError('The Registration Date must be required')
        if not speciality:
            raise ValueError('The Speciality must be required')
        if password != confirm_password:
            raise ValueError('Passwords do not match')

        user = self.model(
            business_name=business_name,
            gst_no=gst_no,
            contact_no=contact_no,
            registration_date=registration_date,
            speciality=speciality,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    business_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True, default="default@example.com")
    gst_no = models.CharField(max_length=15)
    contact_no = models.CharField(max_length=15)
    registration_date = models.DateField()
    speciality = models.CharField(max_length=100)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.business_name
