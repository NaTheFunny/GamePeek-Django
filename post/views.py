from django.shortcuts import render
from .models import Post

# Create your views here.
def index(request):
    posts = Post.objects.all();
    return render(request,'index.html',{'posts':posts})

def crud_view(request):
    return render(request, 'crud.html')