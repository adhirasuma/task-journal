from django.db import models
from django.contrib.auth.models import AbstractUser,User
from django.conf import settings

# Create your models here.
class Todolist(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null=True,blank=True)
    id=models.AutoField(primary_key=True)
    task=models.CharField(max_length=100)
    status=models.BooleanField(default=False)

    def __str__(self):
        return self.task
    
class CustomUser(AbstractUser):
    class Meta:
        #USERNAME_FIELD = 'username'
         
        def __str__(self):
            return self.username
        