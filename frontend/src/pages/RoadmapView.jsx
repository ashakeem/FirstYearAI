import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { LoadingPage } from '../components/ui/Loading'
import { ArrowLeft, Clock, Target, Book, Download, Share2, CheckCircle2, Trophy, Star } from 'lucide-react'
import { Button } from '../components/ui/Button'
import api from '../api'

const RoadmapView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [roadmap, setRoadmap] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [completedItems, setCompletedItems] = useState({})

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await api.get(`/api/roadmaps/${id}/`)
        setRoadmap(response.data)
        setCompletedItems(response.data.completed_items || {})
      } catch (error) {
        console.error('Error fetching roadmap:', error)
        setError(error.response?.data?.detail || 'Failed to load roadmap')
      } finally {
        setLoading(false)
      }
    }

    fetchRoadmap()
  }, [id])

  const handleChecklistItem = async (milestoneId, itemIndex) => {
    try {
      const milestoneIdString = String(milestoneId);
      
      const updatedCompletedItems = { ...completedItems };
      if (!updatedCompletedItems[milestoneIdString]) {
        updatedCompletedItems[milestoneIdString] = [];
      }
      
      const itemIndexNum = Number(itemIndex);
      const currentItems = updatedCompletedItems[milestoneIdString];
      
      if (currentItems.includes(itemIndexNum)) {
        updatedCompletedItems[milestoneIdString] = currentItems.filter(i => i !== itemIndexNum);
      } else {
        updatedCompletedItems[milestoneIdString] = [...currentItems, itemIndexNum];
      }
      
      setCompletedItems(updatedCompletedItems);

      const response = await api.post(`/api/roadmaps/${id}/toggle_checklist_item/`, {
        milestone_id: milestoneIdString,
        item_index: itemIndexNum
      });

      setCompletedItems(response.data.completed_items);
      setRoadmap(prev => ({
        ...prev,
        progress: response.data.progress,
        completed_items: response.data.completed_items
      }));

    } catch (error) {
      console.error('Error updating checklist:', error);
      const response = await api.get(`/api/roadmaps/${id}/`);
      setCompletedItems(response.data.completed_items);
    }
  };

  const calculateMilestoneProgress = (milestoneId, totalItems) => {
    const completedCount = completedItems[milestoneId]?.length || 0;
    return Math.round((completedCount / totalItems) * 100);
  };

  if (loading) return <LoadingPage />
  if (error) return <div className="text-red-500 p-4">{error}</div>
  if (!roadmap) return <div className="p-4">Roadmap not found</div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button
              variant="ghost"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{roadmap.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{roadmap.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center space-x-3 text-indigo-600">
              <Target className="h-5 w-5" />
              <span className="text-sm font-medium">{roadmap.goal}</span>
            </div>
            <div className="flex items-center space-x-3 text-green-600">
              <Book className="h-5 w-5" />
              <span className="text-sm font-medium">{roadmap.current_level}</span>
            </div>
            <div className="flex items-center space-x-3 text-blue-600">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-medium">{roadmap.time_commitment} hours/week</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {roadmap.content && Array.isArray(roadmap.content.milestones) ? (
            roadmap.content.milestones.map((milestone, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <div className="px-8 py-6 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {milestone.title}
                      </h2>
                      <p className="mt-1 text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-8 py-6">
                  {milestone.resources && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Resources</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {milestone.resources.map((resource, resourceIndex) => (
                          <a
                            key={resourceIndex}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-4 rounded-lg bg-gray-50 hover:bg-indigo-50 transition-colors"
                          >
                            <div className="font-medium text-indigo-600 group-hover:text-indigo-700">
                              {resource.title}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {resource.type}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {milestone.project && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Challenge</h3>
                      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-gray-900">{milestone.project.title}</h4>
                        <p className="mt-2 text-gray-600">{milestone.project.description}</p>
                      </div>
                    </div>
                  )}

                  {milestone.assessment && milestone.assessment.checklist && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Trophy className="h-6 w-6 text-indigo-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Success Criteria</h3>
                      </div>
                      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-100">
                        <ul className="space-y-4">
                          {milestone.assessment.checklist.map((item, checkIndex) => {
                            const isCompleted = completedItems[String(milestone.id)]?.includes(checkIndex);
                            return (
                              <li 
                                key={checkIndex} 
                                className="flex items-start group cursor-pointer transform transition-all duration-200 hover:translate-x-1"
                                onClick={() => handleChecklistItem(milestone.id, checkIndex)}
                              >
                                <div className={`
                                  flex-shrink-0 w-6 h-6 rounded-full mr-3 
                                  flex items-center justify-center
                                  ${isCompleted 
                                    ? 'bg-green-500 shadow-sm shadow-green-200' 
                                    : 'border-2 border-indigo-200 group-hover:border-indigo-400 group-hover:shadow-sm'
                                  }
                                  transition-all duration-200 ease-in-out
                                `}>
                                  {isCompleted ? (
                                    <CheckCircle2 
                                      className="h-4 w-4 text-white" 
                                      strokeWidth={3}
                                    />
                                  ) : (
                                    <Star 
                                      className="h-3 w-3 text-indigo-200 group-hover:text-indigo-400" 
                                      strokeWidth={2}
                                    />
                                  )}
                                </div>
                                <span className={`
                                  text-gray-700 pt-0.5
                                  ${isCompleted ? 'line-through text-gray-400' : 'group-hover:text-indigo-600'}
                                  transition-colors duration-200
                                `}>
                                  {item}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                        {/* Progress indicator */}
                        <div className="mt-6 pt-4 border-t border-indigo-100">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-600">
                              Milestone Progress
                            </span>
                            <span className="text-sm font-medium text-indigo-600">
                              {completedItems[String(milestone.id)]?.length || 0}/{milestone.assessment.checklist.length} completed
                            </span>
                          </div>
                          <div className="w-full bg-white rounded-full h-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${calculateMilestoneProgress(String(milestone.id), milestone.assessment.checklist.length)}%` 
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-12">No content available for this roadmap.</div>
          )}
        </div>

        {/* Action buttons */}
        <div className="mt-12 flex justify-end gap-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button 
            className="bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share Roadmap
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RoadmapView 