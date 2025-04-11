'use client';

import Link from 'next/link';
import { FaNewspaper, FaGraduationCap, FaBrain, FaHeartbeat, FaComments } from 'react-icons/fa'; // Using react-icons

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 leading-tight">
            Empower Your Health Journey
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            HealChar provides interactive tools and trusted information to help you understand and manage your health effectively.
          </p>
          <Link href="/auth/register">
            <span className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300 inline-block">
              Get Started for Free
            </span>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Explore Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature 1: News */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <FaNewspaper size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Live Health News</h3>
              <p className="text-gray-600">Stay updated with the latest health trends, research, and news from trusted sources.</p>
              <Link href="/news">
                <span className="text-blue-600 hover:text-blue-800 font-medium mt-4 inline-block">Read News &rarr;</span>
              </Link>
            </div>

            {/* Feature 2: Interactive Learning */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
                <FaGraduationCap size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Quizzes & Flashcards</h3>
              <p className="text-gray-600">Test your knowledge and reinforce learning with interactive quizzes and flashcards.</p>
              <Link href="/quiz">
                <span className="text-green-600 hover:text-green-800 font-medium mt-4 inline-block">Start Learning &rarr;</span>
              </Link>
            </div>

            {/* Feature 3: AI Chatbot */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                <FaComments size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Health Assistant</h3>
              <p className="text-gray-600">Get quick answers to your health questions from our intelligent AI chatbot.</p>
              <Link href="/chatbot">
                <span className="text-purple-600 hover:text-purple-800 font-medium mt-4 inline-block">Ask MediBot &rarr;</span>
              </Link>
            </div>

            {/* Feature 4: Personalized Content */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 text-yellow-600 mb-4">
                <FaHeartbeat size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Personalized Insights</h3>
              <p className="text-gray-600">Receive health information and recommendations tailored to your interests.</p>
              <Link href="/personalized">
                <span className="text-yellow-600 hover:text-yellow-800 font-medium mt-4 inline-block">Get Personalized &rarr;</span>
              </Link>
            </div>

            {/* Feature 5: Knowledge Hub */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4">
                <FaBrain size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Knowledge Hub</h3>
              <p className="text-gray-600">Explore a comprehensive library of health articles curated from reliable sources.</p>
              <Link href="/knowledge-hub">
                <span className="text-red-600 hover:text-red-800 font-medium mt-4 inline-block">Explore Hub &rarr;</span>
              </Link>
            </div>

             {/* Placeholder Feature */}
             <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center justify-center text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 text-gray-400 mb-4">
                <span className="text-3xl">?</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">More Coming Soon</h3>
              <p className="text-gray-600">We're constantly adding new features to enhance your learning experience.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Take Control of Your Health Knowledge?</h2>
          <Link href="/auth/register">
            <span className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300 inline-block">
              Join HealChar Today
            </span>
          </Link>
        </div>
      </section>

      {/* Footer Placeholder */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} HealChar. All rights reserved.
      </footer>
    </div>
  );
} 