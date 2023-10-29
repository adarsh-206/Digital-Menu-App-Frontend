# serializer.py
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('business_name', 'email', 'gst_no', 'contact_no',
                  'registration_date', 'speciality', 'password', 'confirm_password')

    def create(self, validated_data):
        password = validated_data.pop('password')
        confirm_password = validated_data.pop('confirm_password')
        if password != confirm_password:
            raise serializers.ValidationError("Passwords do not match")

        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user
