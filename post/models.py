from django.db import models
from pathlib import Path
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# Create your models here.

def get_image_path(instance,filename):
    return Path('images')/ str(instance.id)/filename

class Post(models.Model):
    title = models.CharField(max_length=250)
    content = models.TextField()
    image = models.ImageField(blank=True,null=True,upload_to='fotos/')
    price = models.IntegerField(default=0)
