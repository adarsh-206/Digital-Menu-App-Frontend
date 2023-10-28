from django.db import models

# Create your models here.


class user(models.Model):
    business_name = models.CharField(max_length=50)
    gst_no = models.CharField(max_length=15)
    contact_no = models.CharField(max_length=15)
    registration_date = models.DateField()
    speciality = models.CharField(max_length=100)
    password = models.CharField(max_length=128)
    confirm_password = models.CharField(max_length=128)
