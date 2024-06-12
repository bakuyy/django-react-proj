from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Note(models.Model):
    #django auto maps + adds tables/rows
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True) #add this argeument means it will  automatically populate given a new instance
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes") # tells you who made this note -- 
    #models.CASCADE deletes title/content/date if u delete author

    def __str__(self):
        return self.title