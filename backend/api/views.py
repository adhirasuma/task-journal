from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework import status
from api.models import Todolist
from .serializers import TodolistSerializer,CustomUserSerializer,UserResgistrationSerializer
from rest_framework.authentication import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated



# Create your views here.
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def Todolistfunction(request):
    if request.method=='GET':
        todo=Todolist.objects.filter(user=request.user)
        serializer=TodolistSerializer(todo,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    elif request.method=='POST':
        serializer=TodolistSerializer(data=request.data)
        if (serializer.is_valid()):
            serializer.save(user=request.user)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
def TodoDetailView(request,pk):
    try:
        todo=Todolist.objects.get(pk=pk,user=request.user)
    except todo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method=='GET':
        serializer=TodolistSerializer(todo,user=request.user)
        return Response(serializer.data,status=status.HTTP_200_OK)
    elif request.method=='PUT':
        serializer=TodolistSerializer(todo,data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method=='DELETE':
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def UserView(request):
    serializer= CustomUserSerializer (request.user)
    return Response(serializer.data)

@api_view(['POST'])
def LoginView(request):
    username=request.data.get('username')
    password=request.data.get('password')

    user=authenticate(username=username,password=password)

    if user is not None:
        refresh=RefreshToken.for_user(user)
        return Response({
            'access':str(refresh.access_token),
            'refresh':str(refresh)
        })
    return Response({"message":"invalid credentials"},status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def RegisterView(request):
    serializer=UserResgistrationSerializer(data=request.data)
    if (serializer.is_valid()):
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def LogoutView(request):
    return Response({"message":"Logout successful (delete token from frontend)"})

