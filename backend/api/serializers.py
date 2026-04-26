from rest_framework import serializers
from .models import Todolist,CustomUser

class TodolistSerializer(serializers.ModelSerializer):
    class Meta:
        model=Todolist
        fields="__all__"


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields="__all__"

class UserResgistrationSerializer(serializers.ModelSerializer):
    password1=serializers.CharField(write_only=True)
    password2=serializers.CharField(write_only=True)

    class Meta:
        model=CustomUser
        fields = ('username', 'password1', 'password2')

        
    def validate(self, attrs):
        if (attrs['password1']!=attrs['password2']):
            raise serializers.ValidationError("password does not match")
        return attrs
        
    def create(self,validated_data):
        password=validated_data.pop('password1')
        validated_data.pop('password2')
        return CustomUser.objects.create_user(password=password,**validated_data)