'use client';

import { useState } from 'react';

const PreferenceForm = ({ initialPreferences = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    ageRange: initialPreferences.ageRange || '',
    healthGoals: initialPreferences.healthGoals || [],
    interests: initialPreferences.interests || [],
    conditions: initialPreferences.conditions || '',
  });

  const categories = [
    'Nutrition', 'Fitness', 'Mental Health', 'Heart Health', 'Diabetes',
    'Sleep', 'Preventive Care', 'Women\'s Health', 'Men\'s Health', 'Pediatrics'
  ];

  const ageRanges = [
    'Under 18', '18-30', '31-45', '46-60', 'Over 60'
  ];

  const goals = [
    'Improve General Wellness', 'Lose Weight', 'Gain Muscle', 'Manage Stress',
    'Improve Sleep', 'Manage a Specific Condition', 'Learn About Prevention'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'healthGoals' || name === 'interests') {
        setFormData(prev => ({
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      } else {
        // Handle single checkboxes if any
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass the form data up to the parent
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tell Us About Yourself</h2>
      <p className="text-gray-600 mb-6">Help us personalize your learning experience by sharing some details. This information helps us suggest relevant content.</p>

      {/* Age Range */}
      <div>
        <label htmlFor="ageRange" className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
        <select
          id="ageRange"
          name="ageRange"
          value={formData.ageRange}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>Select your age range</option>
          {ageRanges.map(range => (
            <option key={range} value={range}>{range}</option>
          ))}
        </select>
      </div>

      {/* Health Goals */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">What are your main health goals? (Select all that apply)</label>
        <div className="grid grid-cols-2 gap-2">
          {goals.map(goal => (
            <div key={goal} className="flex items-center">
              <input
                id={`goal-${goal.replace(/\s+/g, '-')}`}
                name="healthGoals"
                type="checkbox"
                value={goal}
                checked={formData.healthGoals.includes(goal)}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={`goal-${goal.replace(/\s+/g, '-')}`} className="ml-2 block text-sm text-gray-900">
                {goal}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Which topics are you most interested in? (Select all that apply)</label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map(category => (
            <div key={category} className="flex items-center">
              <input
                id={`interest-${category.replace(/\s+/g, '-')}`}
                name="interests"
                type="checkbox"
                value={category}
                checked={formData.interests.includes(category)}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={`interest-${category.replace(/\s+/g, '-')}`} className="ml-2 block text-sm text-gray-900">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Existing Conditions (Optional) */}
      <div>
        <label htmlFor="conditions" className="block text-sm font-medium text-gray-700 mb-1">
          Do you have any specific health conditions you'd like information on? (Optional)
        </label>
        <textarea
          id="conditions"
          name="conditions"
          rows="3"
          value={formData.conditions}
          onChange={handleChange}
          placeholder="e.g., Asthma, Hypertension, Arthritis"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        <p className="text-xs text-gray-500 mt-1">Sharing this helps us find relevant articles, but is not required.</p>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Save Preferences & Get Recommendations
        </button>
      </div>
    </form>
  );
};

export default PreferenceForm; 