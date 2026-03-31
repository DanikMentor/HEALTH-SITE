import json
import requests
from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def ai_chat_api(request): #made by Arsēmijs Kopačs
    if request.method == 'POST':
        try:
            # 1. Твой ключ
            api_key = "AIzaSyC-D0xaaZT-TS_ZVyOZKMGHMNgwfDJk4Xc"
            
            # 2. Используем модель из твоего списка (v1beta + gemini-2.0-flash)
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key={api_key}"
            
            data = json.loads(request.body)
            user_message = data.get('message')
            system_instruction = (
                "Ты — профессиональный фитнес-тренер в приложении HealthApp. "
                "Твоя цель: давать короткие, четкие и научно обоснованные советы по тренировкам и питанию. "
                "Никогда не отвечай на вопросы, не связанные со здоровьем и спортом. "
                "Будь вежливым, но строгим, как настоящий наставник. "
                "Используй эмодзи (💪, 🍎, 🔥), чтобы мотивировать пользователя."
            )

            payload = {
                "contents": [{
                    "parts": [{
                        "text": f"ИНСТРУКЦИЯ: {system_instruction}\n\nВОПРОС ПОЛЬЗОВАТЕЛЯ: {user_message}"
                    }]
                }]
            }

            response = requests.post(url, json=payload, headers={'Content-Type': 'application/json'})
            res_data = response.json()

            if response.status_code == 200:
                ai_text = res_data['candidates'][0]['content']['parts'][0]['text']
                return JsonResponse({'response': ai_text})
            else:
                # Если опять квота или ошибка — выводим только суть
                error_info = res_data.get('error', {}).get('message', 'Ошибка API')
                return JsonResponse({'response': f"Google говорит: {error_info}"}, status=400)

        except Exception as e:
            return JsonResponse({'response': f"Ошибка сервера: {str(e)}"}, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)












#Регистрация made by Nikitos

def register_view(request):
    if request.method == "POST":
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm = request.POST.get('password_confirm')

        if password != confirm:
            messages.error(request, "Пароли не совпадают!")
            return render(request, 'users/register.html')

        if User.objects.filter(username=username).exists():
            messages.error(request, "Этот логин уже занят")
            return render(request, 'users/register.html')

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        login(request, user)
        return redirect('profile')

    return render(request, 'users/register.html')













#Функция логина made by Nikitos

def login_view(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        print(f"Пытаемся войти: Логин={username}, Пароль={password}") # Увидишь, дошли ли данные
        
        # authenticate проверяет, есть ли такой юзер и подходит ли пароль.Спасибо большое моему хорошему знакомому за то что рассказал что такая тематика существует
        user = authenticate(request, username=username, password=password)
        print(f"Результат проверки: {user}")
        
        if user is not None:
            login(request, user)
            return redirect('profile') 
        else:
            messages.error(request, "Неверный логин или пароль")
            return render(request, 'users/login.html')
        
    return render(request, 'users/login.html')

def profile_view(request):
    return render(request, 'users/profile.html')
















def calory_counter_api(request):#Функция для подсчёта калорий Made by Nikitos
    return render(request, 'calory_counter/calory_counter.html')
