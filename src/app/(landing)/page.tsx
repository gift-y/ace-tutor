"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, BookOpen, Users, TrendingUp, Eye, Headphones, Hand, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Ace Tutor</h1>
          </div>
          <Link href="/auth">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Learn Smarter with AI-Powered
            <span className="text-blue-600"> Personalization</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ace Tutor adapts to your unique learning style using advanced AI to create personalized study experiences
            that help you learn faster and retain more.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Start Learning Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 bg-transparent">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Learning Styles Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Tailored to Your Learning Style</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI analyzes your preferences and adapts content to match how you learn best
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Visual Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Interactive diagrams, charts, and visual aids to help you understand complex concepts
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <Headphones className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Auditory Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Audio explanations, discussions, and verbal instructions tailored to your pace
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <Hand className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Kinesthetic Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Hands-on activities, simulations, and interactive exercises for active learning
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Reading/Writing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Text-based learning with note-taking tools and written exercises
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-white/50 rounded-3xl">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools and features designed to enhance your learning experience
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Adaptation</h4>
            <p className="text-gray-600">
              Machine learning algorithms continuously adapt to your learning patterns and preferences
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Courses</h4>
            <p className="text-gray-600">Wide range of subjects with interactive content and real-world applications</p>
          </div>

          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Progress Tracking</h4>
            <p className="text-gray-600">
              Detailed analytics and insights to monitor your learning journey and achievements
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-lg bg-yellow-100 flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-yellow-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Community Support</h4>
            <p className="text-gray-600">Connect with fellow learners and get help from our community of educators</p>
          </div>

          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-lg bg-red-100 flex items-center justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-red-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Flexible Scheduling</h4>
            <p className="text-gray-600">Study at your own pace with personalized schedules that fit your lifestyle</p>
          </div>

          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
              <Brain className="h-8 w-8 text-indigo-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Smart Recommendations</h4>
            <p className="text-gray-600">Get personalized course and content recommendations based on your goals</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Learning?</h3>
          <p className="text-gray-600 mb-8">
            Join thousands of students who are already learning smarter with Ace Tutor
          </p>
          <Link href="/auth">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p>&copy; 2024 Ace Tutor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}