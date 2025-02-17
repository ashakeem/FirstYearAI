import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LoadingPage } from '../components/ui/Loading'
import api from '../api'

const RoadmapView = () => {
  const { id } = useParams()
  const [roadmap, setRoadmap] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await api.get(`/api/roadmaps/${id}/`)
        setRoadmap(response.data)
      } catch (error) {
        console.error('Error fetching roadmap:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRoadmap()
  }, [id])

  if (loading) return <LoadingPage />

  if (!roadmap) return <div>Roadmap not found</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{roadmap.title}</h1>
        <p className="mt-2 text-gray-600">{roadmap.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-700">
            {roadmap.goal}
          </span>
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-700">
            {roadmap.current_level}
          </span>
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700">
            {roadmap.time_commitment} hours/week
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {roadmap.content.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-white rounded-lg shadow">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {section.title}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {section.description}
              </p>
            </div>
            <div className="px-6 py-5">
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50">
                        <span className="text-sm font-medium text-indigo-600">
                          {itemIndex + 1}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base font-medium text-gray-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.description}
                      </p>
                      {item.resources && (
                        <div className="mt-2">
                          <h4 className="text-sm font-medium text-gray-900">Resources:</h4>
                          <ul className="mt-1 list-disc list-inside text-sm text-indigo-600">
                            {item.resources.map((resource, resourceIndex) => (
                              <li key={resourceIndex}>
                                <a
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-indigo-800"
                                >
                                  {resource.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex justify-end gap-4">
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
          Download PDF
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700">
          Share Roadmap
        </button>
      </div>
    </div>
  )
}

export default RoadmapView 