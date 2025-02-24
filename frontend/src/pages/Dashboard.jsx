import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from "lucide-react";
import api from '../api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/Dialog";
import { Button } from "@/components/ui/button";
import { RoadmapSkeleton } from "../components/ui/Loading";
import RoadmapCreationForm from "../components/roadmap/RoadmapCreationForm";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { CheckCircle2 } from "lucide-react";

const Dashboard = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showDeleteError, setShowDeleteError] = useState(false);
  const [showCreateSuccess, setShowCreateSuccess] = useState(false);
  const [showCreateError, setShowCreateError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      const response = await api.get('/api/roadmaps/');
      setRoadmaps(response.data);
    } catch (error) {
      console.error('Error fetching roadmaps:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      await api.post('/api/roadmaps/', formData);
      await fetchRoadmaps();
      setOpen(false);
      setShowCreateSuccess(true);
      setTimeout(() => {
        setShowCreateSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error creating roadmap:', error);
      setShowCreateError(true);
      setTimeout(() => {
        setShowCreateError(false);
      }, 2000);
    }
  };

  const handleDelete = async (roadmapId) => {
    if (window.confirm('Are you sure you want to delete this roadmap?')) {
      try {
        await api.delete(`/api/roadmaps/${roadmapId}/delete/`);
        setShowDeleteSuccess(true);
        setTimeout(() => {
          setShowDeleteSuccess(false);
        }, 2000);
        await fetchRoadmaps();
      } catch (error) {
        console.error('Error deleting roadmap:', error);
      }
    }
  };

  const handleRoadmapClick = (e, roadmapId) => {
    if (e.target.closest('.delete-button')) {
      e.stopPropagation();
      return;
    }
    navigate(`/roadmap/${roadmapId}`);
  };

  if (loading) {
    return <RoadmapSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {showDeleteSuccess && (
        <Alert className="fixed top-4 right-4 w-96 border-green-500 text-green-500 z-50 shadow-lg">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Roadmap has been deleted successfully.
          </AlertDescription>
        </Alert>
      )}

      {showCreateSuccess && (
        <Alert className="fixed top-4 right-4 w-96 border-green-500 text-green-500 z-50 shadow-lg">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>Roadmap has been created successfully.</AlertDescription>
        </Alert>
      )}
      {showCreateError && (
        <Alert className="fixed top-4 right-4 w-96 border-red-500 text-red-500 z-50 shadow-lg">
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>Failed to create roadmap.</AlertDescription>
        </Alert>
      )}

      {showDeleteError && (
        <Alert className="fixed top-4 right-4 w-96 border-red-500 text-red-500 z-50 shadow-lg">
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>Failed to delete roadmap.</AlertDescription>
        </Alert>
      )}


      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Roadmaps</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 text-white">Create Roadmap</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Roadmap</DialogTitle>
              <DialogDescription>
                Fill in the details to create your personalized learning roadmap.
              </DialogDescription>
            </DialogHeader>
            <RoadmapCreationForm onClose={() => setOpen(false)} onCreate={handleCreate} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmaps.map((roadmap) => (
          <div
            key={roadmap.id}
            onClick={(e) => handleRoadmapClick(e, roadmap.id)}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-indigo-500 transition-colors cursor-pointer relative group"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                className="delete-button text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={(e) => handleDelete(roadmap.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{roadmap.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{roadmap.description}</p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                {roadmap.goal}
              </span>
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                {roadmap.current_level}
              </span>
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                {roadmap.time_commitment} hours/week
              </span>
            </div>
            
            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm font-medium text-indigo-600">{roadmap.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${roadmap.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 