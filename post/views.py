from django.shortcuts import render,get_object_or_404,redirect
from .models import Post
from .forms import FormularioJuego

# Create your views here.
def index(request):
    posts = Post.objects.all();
    return render(request,'index.html',{'posts':posts})

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
        
