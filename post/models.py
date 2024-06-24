from django.db import models
from pathlib import Path
# Create your models here.

def get_image_path(instance,filename):
    return Path('images')/ str(instance.id)/filename

class Post(models.Model):
    title = models.CharField(max_length=250)
    content = models.TextField()
    image = models.ImageField(blank=True,null=True,upload_to='fotos/')
    price = models.DecimalField(max_digits=10,decimal_places=2,default=0.00)
    