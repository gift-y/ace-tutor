import React from 'react'
import UnifiedNavbar from '@/components/UnifiedNavbar'
import Logo from '@/components/Logo'
import { Brain, Users, Target, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <UnifiedNavbar variant="landing" />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Ace Tutor
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empowering learners worldwide with AI-driven personalized education
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-2xl p-8 mb-16 shadow-lg">
            <div className="text-center mb-8">
              <Brain className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-600 text-center leading-relaxed">
              At Ace Tutor, we believe that every learner is unique. Our mission is to harness the power of artificial intelligence 
              to create personalized learning experiences that adapt to individual learning styles, pace, and goals. 
              We're committed to making quality education accessible, engaging, and effective for everyone.
            </p>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalization</h3>
              <p className="text-gray-600">
                Every learning journey is tailored to your unique needs and preferences
              </p>
            </div>
            <div className="text-center">
              <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Effectiveness</h3>
              <p className="text-gray-600">
                Proven methods combined with AI to maximize learning outcomes
              </p>
            </div>
            <div className="text-center">
              <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                Commitment to delivering the highest quality educational experience
              </p>
            </div>
          </div>

          {/* Story */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-4">
                Ace Tutor was born from a simple observation: traditional education often follows a one-size-fits-all approach, 
                leaving many learners behind. Our founders, experienced educators and technologists, recognized that 
                artificial intelligence could bridge this gap by creating truly personalized learning experiences.
              </p>
              <p className="mb-4">
                Starting with a small team in 2023, we've grown into a platform that serves thousands of learners worldwide. 
                Our AI algorithms continuously learn and adapt, ensuring that every interaction makes your learning journey 
                more effective and engaging.
              </p>
              <p>
                Today, we're proud to be at the forefront of educational technology, helping learners of all ages and 
                backgrounds achieve their educational goals through intelligent, adaptive learning.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <Logo variant="footer" showText={true} />
          <p className="mt-4 text-gray-400">
            Empowering learners with AI-driven personalized education.
          </p>
          <p className="mt-8 text-gray-400">
            &copy; 2024 Ace Tutor. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}