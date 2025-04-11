'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../ui/LoadingSpinner';
import PreferenceForm from './PreferenceForm';

// Removed HealthRecommendation interface
// Removed UserPreferences interface

const PersonalizedLearningComponent = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [userPreferences, setUserPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPreferenceForm, setShowPreferenceForm] = useState(false);

  // Available health interest categories
  const categories = [
    'Nutrition', 'Fitness', 'Mental Health', 'Heart Health', 'Diabetes',
    'Sleep', 'Preventive Care', 'Women\'s Health', 'Men\'s Health', 'Pediatrics'
  ];

  // Fetch user preferences and recommendations
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const storedPreferences = localStorage.getItem('userHealthPreferences');
        const parsedPreferences = storedPreferences ? JSON.parse(storedPreferences) : null;

        if (isMounted) {
          setUserPreferences(parsedPreferences);
          if (!parsedPreferences) {
            setShowPreferenceForm(true);
          } else {
            try {
              const response = await axios.post('/api/personalized', parsedPreferences);
              if (isMounted) {
                setRecommendations(response.data);
              }
            } catch (apiError) {
              console.error('Error fetching recommendations:', apiError);
              if (isMounted) {
                setError('Failed to load recommendations based on your preferences.');
              }
            }
          }
          setError(null);
        }
      } catch (err) {
        console.error('Error loading preferences:', err);
        if (isMounted) {
          setError('Failed to load your preferences. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Toggle interest selection
  const toggleInterest = (category) => {
    setUserPreferences(prev => {
      const interests = prev.interests.includes(category)
        ? prev.interests.filter(item => item !== category)
        : [...prev.interests, category];

      return { ...prev, interests };
    });
  };

  // Handle form submission: save preferences and fetch new recommendations
  const handleSavePreferences = async (formData) => {
    try {
      setLoading(true);
      localStorage.setItem('userHealthPreferences', JSON.stringify(formData));
      setUserPreferences(formData);

      const response = await axios.post('/api/personalized', formData);
      setRecommendations(response.data);
      setShowPreferenceForm(false);
      setError(null);
    } catch (err) {
      console.error('Error saving preferences/fetching recommendations:', err);
      setError('Failed to save preferences or update recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !userPreferences) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      {showPreferenceForm || !userPreferences ? (
        <PreferenceForm
          initialPreferences={userPreferences || {}}
          onSubmit={handleSavePreferences}
        />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Personalized Health Recommendations</h2>
            <button
              onClick={() => setShowPreferenceForm(true)}
              className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
            >
              Update Preferences
            </button>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Based on Your Preferences:</h3>
            <p className="text-sm text-gray-600"><strong>Age:</strong> {userPreferences.ageRange || 'Not set'}</p>
            <p className="text-sm text-gray-600"><strong>Goals:</strong> {userPreferences.healthGoals?.join(', ') || 'Not set'}</p>
            <p className="text-sm text-gray-600"><strong>Interests:</strong> {userPreferences.interests?.join(', ') || 'Not set'}</p>
            {userPreferences.conditions && <p className="text-sm text-gray-600"><strong>Conditions:</strong> {userPreferences.conditions}</p>}
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : recommendations.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No specific recommendations found based on your preferences. Explore the <Link href="/knowledge-hub"><span className="text-blue-600 hover:underline">Knowledge Hub</span></Link>!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map(recommendation => (
                <div key={recommendation.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                  <div className="relative h-48 w-full">
                    <img
                      src={recommendation.imageUrl}
                      alt={recommendation.title}
                      className="object-cover w-full h-full"
                    />
                    <span className="absolute top-2 right-2 px-2 py-1 bg-blue-600 text-white text-xs rounded">
                      {recommendation.category}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 flex-grow">
                      {recommendation.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {recommendation.description}
                    </p>
                    <a
                      href={recommendation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium mt-auto self-start"
                    >
                      Learn More →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonalizedLearningComponent; 