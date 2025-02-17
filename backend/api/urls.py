from django.urls import path
from .views import RoadmapListCreateView, RoadmapDeleteView

urlpatterns = [
    path('roadmaps/', RoadmapListCreateView.as_view(), name='roadmap-list'),
    path('roadmaps/<int:pk>/', RoadmapDeleteView.as_view(), name='roadmap-delete'),
]
