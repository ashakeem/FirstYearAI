import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/Dialog";
import { Button } from "../components/ui/Button";

import { RoadmapSkeleton } from "../components/ui/Loading";
import RoadmapCreationForm from "../components/roadmap/RoadmapCreationForm";

const Dashboard = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
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
    } catch (error) {
      console.error('Error creating roadmap:', error);
    }
  };

  const handleRoadmapClick = (roadmapId) => {
    navigate(`/roadmap/${roadmapId}`);
  };

  if (loading) {
    return <RoadmapSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Roadmaps</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Create New Roadmap Card */}
        <div className="border-2 border-indigo-500  border-dashed rounded-lg p-6">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full h-full flex flex-col items-center justify-center gap-2">
                <span className="text-4xl">+</span>
                <span>Create New Roadmap</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Roadmap</DialogTitle>
                <DialogDescription>
                  Let's create a personalized learning roadmap for your tech journey.
                </DialogDescription>
              </DialogHeader>
              <RoadmapCreationForm
                onClose={() => setOpen(false)}
                onCreate={handleCreate}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Existing Roadmaps */}
        {roadmaps.map((roadmap) => (
          <div
            key={roadmap.id}
            onClick={() => handleRoadmapClick(roadmap.id)}
            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{roadmap.title}</h3>
            <p className="text-sm text-gray-600">{roadmap.description}</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Created {new Date(roadmap.created_at).toLocaleDateString()}</span>
                <span>{roadmap.tasks_count || 0} tasks</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 