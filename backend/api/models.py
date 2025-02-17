
# Create your models here.
from django.db import models
from django.contrib.auth.models import User


class Roadmap(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    goal = models.CharField(max_length=50)  # frontend, backend, fullstack
    current_level = models.CharField(max_length=50)
    time_commitment = models.IntegerField()
    primary_interests = models.JSONField()
    learning_style = models.CharField(max_length=50)
     # Store the AI-generated roadmap content
    content = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
    
    
class RoadmapMilestone(models.Model):
    roadmap = models.ForeignKey(Roadmap, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    order = models.IntegerField()
    estimated_hours = models.IntegerField()
    resources = models.JSONField()  # Store recommended learning resources
    
  
    
    


