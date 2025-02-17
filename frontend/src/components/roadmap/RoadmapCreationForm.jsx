import { useState } from 'react';
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

const steps = [
  {
    id: 'basics',
    name: 'Basic Information',
    fields: ['title', 'description', 'goal']
  },
  {
    id: 'experience',
    name: 'Experience Level',
    fields: ['currentLevel', 'timeCommitment']
  },
  {
    id: 'interests',
    name: 'Technical Interests',
    fields: ['primaryInterests', 'learningStyle']
  }
];

const RoadmapCreationForm = ({ onClose, onCreate }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal: 'frontend',
    currentLevel: 'BEGINNER',
    timeCommitment: '10',
    primaryInterests: [],
    learningStyle: 'VISUAL'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit(e);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSubmit = {
        ...formData,
        timeCommitment: parseInt(formData.timeCommitment, 10),
        primaryInterests: formData.primaryInterests.length > 0 ? formData.primaryInterests : []
      };

      await onCreate(formDataToSubmit);
      onClose();
    } catch (error) {
      console.error('Error creating roadmap:', error);
    }
  };

  const isStepValid = () => {
    const currentFields = steps[currentStep].fields;
    return currentFields.every(field => {
      if (field === 'primaryInterests') {
        return formData[field].length > 0;
      }
      return formData[field] !== '';
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Roadmap Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Frontend Development Journey"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of your learning goals"
              />
            </div>
            <div>
              <Label htmlFor="goal">Primary Goal</Label>
              <select
                id="goal"
                value={formData.goal}
                onChange={(e) => handleInputChange('goal', e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="frontend">Frontend Development</option>
                <option value="backend">Backend Development</option>
                <option value="fullstack">Full Stack Development</option>
              </select>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentLevel">Current Experience Level</Label>
              <select
                id="currentLevel"
                value={formData.currentLevel}
                onChange={(e) => handleInputChange('currentLevel', e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <Label htmlFor="timeCommitment">Weekly Time Commitment (hours)</Label>
              <Input
                id="timeCommitment"
                type="number"
                value={formData.timeCommitment}
                onChange={(e) => handleInputChange('timeCommitment', e.target.value)}
                placeholder="e.g., 10"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label>Primary Interests</Label>
              <div className="grid grid-cols-2 gap-2">
                {['UI/UX', 'Databases', 'APIs', 'Testing', 'DevOps', 'Mobile'].map((interest) => (
                  <label key={interest} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.primaryInterests.includes(interest)}
                      onChange={(e) => {
                        const newInterests = e.target.checked
                          ? [...formData.primaryInterests, interest]
                          : formData.primaryInterests.filter(i => i !== interest);
                        handleInputChange('primaryInterests', newInterests);
                      }}
                    />
                    <span>{interest}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="learningStyle">Preferred Learning Style</Label>
              <select
                id="learningStyle"
                value={formData.learningStyle}
                onChange={(e) => handleInputChange('learningStyle', e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="visual">Visual Learning</option>
                <option value="reading">Reading & Documentation</option>
                <option value="interactive">Interactive & Hands-on</option>
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form className="space-y-4">
      {/* Progress Indicator */}
      <div className="border-b border-gray-200">
        <nav className="flex justify-center -mb-px space-x-8">
          {steps.map((step, index) => (
            <button
              key={step.id}
              type="button"
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                index === currentStep
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setCurrentStep(index)}
              disabled={index > currentStep}
            >
              {step.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Step Content */}
      <div className="mt-6">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button 
          type="button"
          variant="outline" 
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Back
        </Button>
        <div className="flex gap-2">
          <Button 
            type="button"
            variant="outline" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleNext}
            disabled={!isStepValid()}
          >
            {currentStep === steps.length - 1 ? 'Create Roadmap' : 'Next'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RoadmapCreationForm; 