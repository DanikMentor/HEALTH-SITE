# config/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('ai-chat/', include('apps.ai_chat.urls')), 
    path('admin/', admin.site.urls),
    path('users/', include('apps.users.urls')),
    
    # Сначала проверяем конкретный адрес чата

    
    # И только в самом конце — главную/профиль
    path('', include('apps.main.urls')), 
]