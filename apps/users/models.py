from django.db import models
from django.contrib.auth.models import User

class Goal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    progress = models.IntegerField(default=0) # Процент выполнения

    def __str__(self):
        return self.title

#made by Arsenij