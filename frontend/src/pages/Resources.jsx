import { useEffect, useState } from 'react';


const Resources = () => {

  const [activeTab, setActiveTab] = useState('all');

  const resources = {
    learning: [
      {
        title: "freeCodeCamp",
        description: "Free coding bootcamp covering web development, JavaScript, and more",
        url: "https://www.freecodecamp.org/",
        category: "learning"
      },
      {
        title: "The Odin Project",
        description: "Free full-stack curriculum",
        url: "https://www.theodinproject.com/",
        category: "learning"
      },
      {
        title: "LeetCode",
        description: "Platform for technical interview preparation",
        url: "https://leetcode.com/",
        category: "practice"
      }
    ],
    internships: [
      {
        title: "Summer 2024 Tech Internships",
        description: "GitHub list of tech internships for Summer 2024",
        url: "https://github.com/pittcsc/Summer2024-Internships",
        category: "internships"
      },
      {
        title: "Levels.fyi Internships",
        description: "Internship salary data and listings",
        url: "https://www.levels.fyi/internships/",
        category: "internships"
      }
    ],
    communities: [
      {
        title: "Tech Interview Handbook",
        description: "Curated coding interview preparation materials",
        url: "https://www.techinterviewhandbook.org/",
        category: "interview"
      },
      {
        title: "r/cscareerquestions",
        description: "Reddit community for CS career questions",
        url: "https://www.reddit.com/r/cscareerquestions/",
        category: "community"
      }
    ]
  };

  const filterResources = () => {
    if (activeTab === 'all') {
      return Object.values(resources).flat();
    }
    return resources[activeTab] || [];
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
        <p className="mt-2 text-gray-600">
          Curated resources to help you break into tech and land your dream role.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-2 mb-6">
        {['all', 'learning', 'internships', 'communities'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === tab
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterResources().map((resource, index) => (
          <a
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-indigo-500 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {resource.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
              {resource.category}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Resources;
