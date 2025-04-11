import PersonalizedLearningComponent from '@/components/PersonalizedLearning/PersonalizedLearningComponent';

export default function PersonalizedPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Personalized Health Learning</h1>
      <p className="text-gray-600 mb-8">
        Get tailored health recommendations and resources based on your interests and preferences.
      </p>
      <PersonalizedLearningComponent />
    </div>
  );
} 