from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    email = serializers.CharField(required=True)
    username = serializers.CharField(required=True)
    class Meta:
        model = User
        fields = ('email','username')

    # fields = "__all__"