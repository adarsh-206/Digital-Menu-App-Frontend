from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    mobile_number = serializers.CharField(
        required=True, max_length=10, min_length=10)
    email = serializers.EmailField(required=False)
    gst_no = serializers.CharField(max_length=15)
    user_name = serializers.CharField(max_length=50)

    class Meta:
        model = User
        fields = ('mobile_number', 'email', 'gst_no', 'user_name', 'password')

    def create(self, validated_data):
        user = User(**validated_data)

        if User.objects.filter(mobile_number=validated_data['mobile_number']).exists():
            raise serializers.ValidationError(
                "Mobile number is already in use.")

        if User.objects.filter(user_name=validated_data['user_name']).exists():
            raise serializers.ValidationError("Username is already in use.")

        user.set_password(validated_data['password'])
        user.save()
        return user
