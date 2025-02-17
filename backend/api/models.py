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
    
    # Add default empty dictionary for content and completed_items
    content = models.JSONField(default=dict)
    completed_items = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
    
    @property
    def progress(self):
        if not self.content or 'milestones' not in self.content:
            return 0
            
        total_items = 0
        completed = 0
        
        for milestone in self.content['milestones']:
            if milestone.get('assessment', {}).get('checklist'):
                milestone_items = len(milestone['assessment']['checklist'])
                total_items += milestone_items
                
                milestone_id = str(milestone.get('id', ''))
                completed_in_milestone = len(self.completed_items.get(milestone_id, []))
                completed += completed_in_milestone
                
        return round((completed / total_items * 100) if total_items > 0 else 0)
    
    
class RoadmapMilestone(models.Model):
    roadmap = models.ForeignKey(Roadmap, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    order = models.IntegerField()
    estimated_hours = models.IntegerField()
    resources = models.JSONField()  # Store recommended learning resources
    
  
    
    


