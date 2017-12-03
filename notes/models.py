from django.conf.global_settings import LANGUAGES
from django.contrib.auth.models import User
from django.db import models


class Note(models.Model):
    word = models.CharField(max_length=256)
    definition = models.TextField()
    context = models.TextField()
    language = models.CharField(max_length=7, choices=LANGUAGES)
    owner = models.ForeignKey(
        User, related_name='notes', on_delete=models.CASCADE)
