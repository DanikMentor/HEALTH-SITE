from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_view, name='register'),#this url made by Danik but Nikita move it to this file 
    path('login/', views.login_view, name='login'),#this url made by Danik but Nikita move it to this file 
    path('profile/', views.profile_view, name='profile'),#this url made by Danik but Nikita move it to this file 
    path('ai_chat_api/', views.ai_chat_api, name='ai_chat_api'),#this url made by Arsēmijs Kopačs
    path('calory_counter_api/', views.calory_counter_api, name='calory_counter_api')#this url made by Nikita Kudevics
]