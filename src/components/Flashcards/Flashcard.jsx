'use client';

import { useState } from 'react';

// Removed FlashcardProps interface

// Removed type annotation from props
const Flashcard = ({ question, answer, category }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="w-full h-64 perspective-1000 cursor-pointer"
      onClick={handleFlip}
    >
      <div className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front side - Question */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-md p-6 flex flex-col">
          <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded self-start mb-4">
            {category}
          </div>
          <div className="flex-1 flex items-center justify-center">
            <h3 className="text-xl font-semibold text-center text-gray-800">{question}</h3>
          </div>
          <div className="text-center text-gray-500 text-sm mt-4">Click to reveal answer</div>
        </div>

        {/* Back side - Answer */}
        <div className="absolute w-full h-full backface-hidden bg-blue-50 rounded-lg shadow-md p-6 rotate-y-180 flex flex-col">
          <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded self-start mb-4">
            {category}
          </div>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-center text-gray-700">{answer}</p>
          </div>
          <div className="text-center text-gray-500 text-sm mt-4">Click to see question</div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard; 