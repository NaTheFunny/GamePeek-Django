from django.shortcuts import render,get_object_or_404,redirect
from .models import Post
from .models import *
from .forms import FormularioJuego
from .forms import CustomUserCreationForm , CustomAuthenticationForm
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import  login, authenticate  

# Create your views here.
def index(request):
    posts = Post.objects.all();
    return render(request,'index.html',{'posts':posts})

@login_required
def cart_view(request):
    cart_items = CartItem.objects.filter(user=request.user)
    total = sum(item.product.price * item.quantity for item in cart_items)
    return render(request, 'cart.html', {'cart_items': cart_items, 'total': total})

@login_required
def add_to_cart(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    cart_item, created = CartItem.objects.get_or_create(user=request.user, product=product)
    if not created:
        cart_item.quantity += 1
        cart_item.save()
    return redirect('cart')

@login_required
def remove_from_cart(request, item_id):
    cart_item = get_object_or_404(CartItem, pk=item_id, user=request.user)
    cart_item.delete()
    return redirect('cart')

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
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

def agregar(request):
    if request.method == "POST":
        form = FormularioJuego(request.POST,request.FILES)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = FormularioJuego()
    return render(request,'agregar.html',{'form': form})

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

def eliminar(request,pk):
    post = get_object_or_404(Post,pk=pk)
    if request.method == "POST":
        post.delete()
        return redirect('index')
    return render(request,'eliminar.html',{'post': post})
        
