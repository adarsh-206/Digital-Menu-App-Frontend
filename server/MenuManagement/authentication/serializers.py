from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=4,
                                     error_messages={
                                         'required': 'Password is required.',
                                         'blank': 'Password is required.',
                                         'min_length': 'Password should contain minimum 4 characters.',
                                     })
    mobile_number = serializers.CharField(
        required=True, max_length=10, min_length=10,
        error_messages={
            'required': 'Mobile Number is required.',
            'blank': 'Mobile number is required.',
            'min_length': 'Enter valid 10 digit mobile number.',
            'max_length': 'Enter valid 10 digit mobile number.',
        })
    email = serializers.EmailField(required=False, allow_blank=True)
    # State + PAN-based 15-characters
    gst_no = serializers.CharField(min_length=15, max_length=15, required=True,
                                   error_messages={
                                       'required': 'GST Number is required.',
                                       'blank': 'GST Number is required.',
                                       'min_length': 'Enter valid GST number.',
                                       'max_length': 'Enter valid GST number.',
                                   })

    class Meta:
        model = User
        fields = ('mobile_number', 'email', 'gst_no', 'password')

    def validate_fields(self, validated_data):

        if User.objects.filter(mobile_number=validated_data['mobile_number']).exists():
            raise serializers.ValidationError(
                {"mobile_number": ["Mobile number is already in use."]})

        if User.objects.filter(email=validated_data['email']).exists():
            raise serializers.ValidationError(
                {"email": ["Email is already in use."]})

        if User.objects.filter(gst_no=validated_data['gst_no']).exists():
            raise serializers.ValidationError(
                {"gst_no": ["GST no is already in use."]})

    def create(self, validated_data):
        self.validate_fields(validated_data)

        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
