from django.contrib.auth.models import User
from .models import Roadmap

from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            "password": {"write_only": True},
            "email": {
                "required": False,     # Not strictly required
                "allow_blank": True,   # Allows the field to be an empty string
                "allow_null": True     # Allows the field to be null
            },
        }
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
    
    
class RoadmapSerializer(serializers.ModelSerializer):
    progress = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Roadmap
        fields = [
            'id',
            'title',
            'description',
            'goal',
            'current_level',
            'time_commitment',
            'primary_interests',
            'learning_style',
            'content',
            'completed_items',
            'progress',
            'author',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ('id', 'author', 'created_at', 'updated_at', 'progress')

    def create(self, validated_data):
        # Ensure content is included in creation
        print("creating roadmap: ",validated_data)
        return super().create(validated_data)
        
        
        
        