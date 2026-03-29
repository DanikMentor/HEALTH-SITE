from django.urls import path
from .views import chat_view  # Импортируем конкретную функцию

urlpatterns = [
    path('', chat_view, name='ai_chat'),
]#made by Arsēnijs Kopačs