import { useState } from 'react';

import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Button } from "../components/ui/Button";

const Resume = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    education: [{
      school: '',
      degree: '',
      gradDate: '',
      gpa: ''
    }],
    experience: [{
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
    projects: [{
      name: '',
      technologies: '',
      description: ''
    }],
    skills: {
      languages: '',
      frameworks: '',
      tools: ''
    }
  });

  const handleChange = (section, index, field, value) => {
    setFormData(prev => {
      if (Array.isArray(prev[section])) {
        const newArray = [...prev[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prev, [section]: newArray };
      } else if (typeof prev[section] === 'object') {
        return { ...prev, [section]: { ...prev[section], [field]: value } };
      }
      return { ...prev, [field]: value };
    });
  };

  const addSection = (section) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], getEmptyObject(section)]
    }));
  };

  const getEmptyObject = (section) => {
    switch (section) {
      case 'education':
        return { school: '', degree: '', gradDate: '', gpa: '' };
      case 'experience':
        return { company: '', position: '', startDate: '', endDate: '', description: '' };
      case 'projects':
        return { name: '', technologies: '', description: '' };
      default:
        return {};
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add API call here to process resume
      console.log('Form submitted:', formData);
      // You can add the API call here to convert to Jake's resume format
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Resume Builder</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleChange('personal', 0, 'fullName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('personal', 0, 'email', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Education</h2>
            <Button
              type="button"
              variant="outline"
              onClick={() => addSection('education')}
            >
              Add Education
            </Button>
          </div>
          {formData.education.map((edu, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label>School</Label>
                <Input
                  value={edu.school}
                  onChange={(e) => handleChange('education', index, 'school', e.target.value)}
                />
              </div>
              <div>
                <Label>Degree</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => handleChange('education', index, 'degree', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Experience Section */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Experience</h2>
            <Button
              type="button"
              variant="outline"
              onClick={() => addSection('experience')}
            >
              Add Experience
            </Button>
          </div>
          {formData.experience.map((exp, index) => (
            <div key={index} className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => handleChange('experience', index, 'company', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Position</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => handleChange('experience', index, 'position', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <textarea
                  className="w-full p-2 border rounded-md"
                  rows={4}
                  value={exp.description}
                  onChange={(e) => handleChange('experience', index, 'description', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        <Button type="submit" className="w-full bg-indigo-600 text-white">
          Generate Resume
        </Button>
      </form>
    </div>
  );
};

export default Resume;
