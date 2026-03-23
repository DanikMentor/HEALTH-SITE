from django.shortcuts import render

def index(request):
    return render(request, 'main/index.html')

def register_view(request):
    return render(request, 'users/register.html')

