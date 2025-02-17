from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny 
from .models import Roadmap
from .serializers import UserSerializer, RoadmapSerializer
from .services.gemini import RoadmapGenerator


# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user


class RoadmapListCreateView(generics.ListCreateAPIView):
    serializer_class = RoadmapSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Roadmap.objects.filter(author=user)

    def create(self, request, *args, **kwargs):
        generator = RoadmapGenerator()
        
        try:
            # Generate roadmap content using Gemini
            roadmap_content = generator.generate_roadmap(request.data)
            
            # Combine form data with AI-generated content
            roadmap_data = {
                'title': request.data.get('title'),
                'description': request.data.get('description'),
                'goal': request.data.get('goal'),
                'current_level': request.data.get('currentLevel'),
                'time_commitment': request.data.get('timeCommitment'),
                'primary_interests': request.data.get('primaryInterests', []),
                'learning_style': request.data.get('learningStyle'),
            }
            
            # Create serializer with content in context
            serializer = self.get_serializer(
                data=roadmap_data, 
                context={'roadmap_content': roadmap_content}
            )
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            
            headers = self.get_success_headers(serializer.data)
            return Response(
                serializer.data, 
                status=status.HTTP_201_CREATED, 
                headers=headers
            )
            
        except Exception as e:
            print(f"Error creating roadmap: {str(e)}")  # Add debug logging
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
            
    def list(self, request, *args, **kwargs):
        """
        List all roadmaps for the authenticated user
        """
        queryset = self.get_queryset()
        
        # goal = request.query_params.get('goal',None)
        # if goal:
        #     queryset = queryset.filter(goal=goal)
            
            
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    
class RoadmapDeleteView(generics.DestroyAPIView):
    serializer_class = RoadmapSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Roadmap.objects.filter(author=user)
    
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {
                    'error': 'Roadmap not found',
                    'detail': 'The requested roadmap does not exist or you do not have permission to delete it'
                },
                status=status.HTTP_404_NOT_FOUND
            )
            
    



