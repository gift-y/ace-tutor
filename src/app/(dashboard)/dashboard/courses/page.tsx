"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Calendar,
  Play,
  CheckCircle,
  Award,
  Star,
  Users,
  BarChart3,
  Eye,
  Headphones,
  Hand,
  Brain,
  Zap,
  Lightbulb,
  Trophy,
  Clock3,
  CalendarDays,
  BookMarked,
  GraduationCap,
  Activity,
  ChevronRight,
  Plus,
  Filter,
  Search
} from "lucide-react"
import { cn } from "@/lib/utils"
import { subjects } from "@/utils/quiz-data"

interface Course {
  id: string
  title: string
  description: string
  subject: string
  instructor: string
  duration: number // in hours
  lessons: number
  completedLessons: number
  progress: number // percentage
  difficulty: "beginner" | "intermediate" | "advanced"
  rating: number
  enrolledStudents: number
  lastAccessed: Date
  startDate: Date
  estimatedCompletion: Date
  learningPreference: string
  status: "active" | "completed" | "paused"
  thumbnail?: string
  tags: string[]
}

interface Lesson {
  id: string
  title: string
  duration: number // in minutes
  type: "video" | "text" | "quiz" | "assignment" | "interactive"
  isCompleted: boolean
  isLocked: boolean
  description: string
}

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("overview")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filterSubject, setFilterSubject] = useState<string>("all")

  // Mock data for user's selected courses from onboarding
  const userCourses: Course[] = [
    {
      id: "1",
      title: "Introduction to Algebra",
      description: "Master the fundamentals of algebraic expressions, equations, and problem-solving techniques.",
      subject: "Mathematics",
      instructor: "Dr. Sarah Johnson",
      duration: 24,
      lessons: 12,
      completedLessons: 8,
      progress: 67,
      difficulty: "beginner",
      rating: 4.8,
      enrolledStudents: 1247,
      lastAccessed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      estimatedCompletion: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      learningPreference: "visual",
      status: "active",
      tags: ["algebra", "equations", "variables", "problem-solving"]
    },
    {
      id: "2",
      title: "Biology Fundamentals",
      description: "Explore the building blocks of life, from cells to ecosystems.",
      subject: "Science",
      instructor: "Prof. Michael Chen",
      duration: 32,
      lessons: 16,
      completedLessons: 12,
      progress: 75,
      difficulty: "intermediate",
      rating: 4.6,
      enrolledStudents: 892,
      lastAccessed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
      estimatedCompletion: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      learningPreference: "reading/writing",
      status: "active",
      tags: ["biology", "cells", "ecosystems", "life-science"]
    },
    {
      id: "3",
      title: "Creative Writing Workshop",
      description: "Develop your writing skills through creative exercises and storytelling techniques.",
      subject: "Language",
      instructor: "Emma Rodriguez",
      duration: 20,
      lessons: 10,
      completedLessons: 10,
      progress: 100,
      difficulty: "intermediate",
      rating: 4.9,
      enrolledStudents: 567,
      lastAccessed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
      estimatedCompletion: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      learningPreference: "reading/writing",
      status: "completed",
      tags: ["writing", "creativity", "storytelling", "literature"]
    },
    {
      id: "4",
      title: "World Geography",
      description: "Discover the diverse landscapes, cultures, and regions of our world.",
      subject: "Geography",
      instructor: "Dr. James Wilson",
      duration: 28,
      lessons: 14,
      completedLessons: 3,
      progress: 21,
      difficulty: "beginner",
      rating: 4.7,
      enrolledStudents: 734,
      lastAccessed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      estimatedCompletion: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
      learningPreference: "visual",
      status: "active",
      tags: ["geography", "world", "cultures", "landscapes"]
    }
  ]

  // Mock lesson data for selected course
  const courseLessons: Lesson[] = [
    {
      id: "1",
      title: "Introduction to Variables",
      duration: 45,
      type: "video",
      isCompleted: true,
      isLocked: false,
      description: "Learn about variables and how they represent unknown values in equations."
    },
    {
      id: "2",
      title: "Solving Linear Equations",
      duration: 60,
      type: "interactive",
      isCompleted: true,
      isLocked: false,
      description: "Practice solving linear equations step by step."
    },
    {
      id: "3",
      title: "Quiz: Basic Algebra",
      duration: 30,
      type: "quiz",
      isCompleted: true,
      isLocked: false,
      description: "Test your understanding of basic algebraic concepts."
    },
    {
      id: "4",
      title: "Word Problems",
      duration: 75,
      type: "assignment",
      isCompleted: false,
      isLocked: false,
      description: "Apply algebra to solve real-world problems."
    },
    {
      id: "5",
      title: "Quadratic Equations",
      duration: 90,
      type: "video",
      isCompleted: false,
      isLocked: false,
      description: "Introduction to quadratic equations and their solutions."
    },
    {
      id: "6",
      title: "Advanced Problem Solving",
      duration: 120,
      type: "interactive",
      isCompleted: false,
      isLocked: true,
      description: "Complex algebraic problem-solving techniques."
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "paused": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video": return Play
      case "text": return BookOpen
      case "quiz": return Brain
      case "assignment": return Target
      case "interactive": return Hand
      default: return BookOpen
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    return `${Math.floor(diffInDays / 30)} months ago`
  }

  const filteredCourses = userCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = filterSubject === "all" || course.subject === filterSubject
    return matchesSearch && matchesSubject
  })

  const selectedCourseData = userCourses.find(course => course.id === selectedCourse)

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-primary" />
              My Courses
            </h1>
            <p className="text-muted-foreground mt-2">
              Continue your learning journey with personalized courses
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background"
            />
          </div>
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-3 py-2 border border-input rounded-md bg-background"
          >
            <option value="all">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Course List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredCourses.map(course => (
              <Card 
                key={course.id} 
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  selectedCourse === course.id && "ring-2 ring-primary"
                )}
                onClick={() => setSelectedCourse(course.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={cn("text-xs", getDifficultyColor(course.difficulty))}>
                          {course.difficulty}
                        </Badge>
                        <Badge className={cn("text-xs", getStatusColor(course.status))}>
                          {course.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {course.rating}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {course.duration}h
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {course.lessons} lessons
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {course.enrolledStudents} students
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {course.completedLessons} of {course.lessons} lessons completed
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2 ml-4">
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground text-right">
                        Last accessed<br />
                        {formatTimeAgo(course.lastAccessed)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Course Details */}
          <div className="space-y-6">
            {selectedCourseData ? (
              <>
                {/* Course Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Course Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">{selectedCourseData.title}</h3>
                      <p className="text-sm text-muted-foreground">{selectedCourseData.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Instructor</span>
                        <p className="font-medium">{selectedCourseData.instructor}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration</span>
                        <p className="font-medium">{selectedCourseData.duration}h</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Started</span>
                        <p className="font-medium">{formatDate(selectedCourseData.startDate)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Est. Completion</span>
                        <p className="font-medium">{formatDate(selectedCourseData.estimatedCompletion)}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Overall Progress</span>
                        <span>{selectedCourseData.progress}%</span>
                      </div>
                      <Progress value={selectedCourseData.progress} className="h-3" />
                    </div>

                    <Button className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>

                {/* Learning Analytics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Learning Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {selectedCourseData.completedLessons}
                        </div>
                        <div className="text-sm text-muted-foreground">Lessons Completed</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {Math.floor(selectedCourseData.duration * (selectedCourseData.progress / 100))}h
                        </div>
                        <div className="text-sm text-muted-foreground">Time Spent</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Learning Streak</span>
                        <span className="text-green-600 dark:text-green-400">5 days</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Average Score</span>
                        <span className="text-blue-600 dark:text-blue-400">87%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Study Time
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Target className="h-4 w-4 mr-2" />
                      Set Learning Goals
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Join Study Group
                    </Button>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Select a Course</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose a course from the list to view details and progress
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Course Lessons (when course is selected) */}
        {selectedCourseData && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Course Lessons
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {courseLessons.map((lesson, index) => {
                  const Icon = getLessonIcon(lesson.type)
                  return (
                    <div
                      key={lesson.id}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-lg border transition-colors",
                        lesson.isCompleted && "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
                        lesson.isLocked && "opacity-50 cursor-not-allowed",
                        !lesson.isLocked && !lesson.isCompleted && "hover:bg-muted cursor-pointer"
                      )}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          lesson.isCompleted && "bg-green-500 text-white",
                          lesson.isLocked && "bg-gray-300 dark:bg-gray-600",
                          !lesson.isLocked && !lesson.isCompleted && "bg-blue-500 text-white"
                        )}>
                          {lesson.isCompleted ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : lesson.isLocked ? (
                            <span className="text-xs">🔒</span>
                          ) : (
                            <span className="text-xs font-bold">{index + 1}</span>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            <h4 className="font-medium">{lesson.title}</h4>
                            {lesson.isCompleted && (
                              <Badge variant="secondary" className="text-xs">Completed</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{lesson.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {lesson.duration}m
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}