from django.shortcuts import render,get_object_or_404,redirect
from .models import Post
from .models import *
from .forms import FormularioJuego
from .forms import CustomUserCreationForm , CustomAuthenticationForm
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import  login, authenticate
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .decorators import admin_required

# Create your views here.
def index(request):
    posts = Post.objects.all();
    return render(request,'index.html',{'posts':posts})

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_staff = False  
            user.save()
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect('index')
    else:
        form = CustomUserCreationForm()
    return render(request, 'registration/register.html', {'form': form})

def user_login(request):
    if request.method == 'POST':
        form = CustomAuthenticationForm(data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('index') 
    else:
        form = CustomAuthenticationForm()
    return render(request, 'registration/login.html', {'form': form})
@admin_required
def agregar(request):
    if request.method == "POST":
        form = FormularioJuego(request.POST,request.FILES)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = FormularioJuego()
    return render(request,'agregar.html',{'form': form})
@admin_required
def editar(request,pk):
    post = get_object_or_404(Post,pk=pk)
    if request.method == "POST":
        form = FormularioJuego(request.POST,request.FILES,instance=post)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = FormularioJuego(instance=post)
    return render(request,'editar.html',{'form': form})
@admin_required
def eliminar(request,pk):
    post = get_object_or_404(Post,pk=pk)
    if request.method == "POST":
        post.delete()
        return redirect('index')
    return render(request,'eliminar.html',{'post': post})

