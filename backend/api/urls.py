from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('todo/',Todolistfunction),
    path('todo/<int:pk>/', TodoDetailView),
    path('auth/login/',LoginView),
    path('auth/logout/',LogoutView),
    path('auth/user/',UserView),
    path('auth/register/',RegisterView),
    path('auth/token/refresh/', TokenRefreshView.as_view()),

]