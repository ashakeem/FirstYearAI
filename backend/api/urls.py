from django.urls import path
from .views import RoadmapListCreateView, RoadmapDeleteView, RoadmapDetailView

urlpatterns = [
    path('roadmaps/', RoadmapListCreateView.as_view(), name='roadmap-list'),
    path('roadmaps/<int:pk>/', RoadmapDetailView.as_view({
        'get': 'retrieve',
    }), name='roadmap-detail'),
    path('roadmaps/<int:pk>/delete/', RoadmapDeleteView.as_view(), name='roadmap-delete'),
    path('roadmaps/<int:pk>/toggle_checklist_item/', 
         RoadmapDetailView.as_view({
             'post': 'toggle_checklist_item'
         }), 
         name='roadmap-toggle-checklist'),
]
