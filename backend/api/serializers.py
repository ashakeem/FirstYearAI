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
            'author',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ('id', 'author', 'created_at', 'updated_at')

    def validate_time_commitment(self, value):
        if value <= 0:
            raise serializers.ValidationError("Time commitment must be greater than 0")
        return value

    def validate_primary_interests(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("Primary interests must be a list")
        if not value:
            raise serializers.ValidationError("At least one primary interest is required")
        return value

    def validate_goal(self, value):
        valid_goals = ['frontend', 'backend', 'fullstack']
        if value.lower() not in valid_goals:
            raise serializers.ValidationError(f"Goal must be one of: {', '.join(valid_goals)}")
        return value.lower()

    def validate_current_level(self, value):
        valid_levels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED']
        if value.upper() not in valid_levels:
            raise serializers.ValidationError(f"Current level must be one of: {', '.join(valid_levels)}")
        return value.upper()

    def validate_learning_style(self, value):
        valid_styles = ['VISUAL', 'AUDITORY', 'READING', 'KINESTHETIC']
        if value.upper() not in valid_styles:
            raise serializers.ValidationError(f"Learning style must be one of: {', '.join(valid_styles)}")
        return value.upper()

    def create(self, validated_data):
        # Ensure content is included in creation
        if 'content' in self.context.get('roadmap_content', {}):
            validated_data['content'] = self.context.get('roadmap_content')
        return super().create(validated_data)
        
        
        
        