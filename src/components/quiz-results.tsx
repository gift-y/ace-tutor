"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  Trophy, 
  Target, 
  Brain, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  Headphones,
  Hand,
  BookOpen,
  TrendingUp,
  BarChart3
} from "lucide-react"
import { Question, LearningPreference } from "@/utils/quiz-data"

interface QuizResultsProps {
  score: number
  totalQuestions: number
  questions: Question[]
  timeSpent: number // in seconds
  onRetry: () => void
  onNewSession: () => void
}

interface PerformanceByPreference {
  preference: LearningPreference
  correct: number
  total: number
  percentage: number
}

export default function QuizResults({ 
  score, 
  totalQuestions, 
  questions, 
  timeSpent, 
  onRetry, 
  onNewSession 
}: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100)
  const timeSpentMinutes = Math.floor(timeSpent / 60)
  const timeSpentSeconds = timeSpent % 60

  // Calculate performance by learning preference
  const performanceByPreference: PerformanceByPreference[] = []
  const preferenceMap = new Map<LearningPreference, { correct: number; total: number }>()

  questions.forEach(question => {
    const pref = question.learningPreference
    const current = preferenceMap.get(pref) || { correct: 0, total: 0 }
    
    // For simplicity, we'll assume all questions were answered
    // In a real app, you'd track which questions were answered correctly
    current.total += 1
    if (Math.random() > 0.3) { // Simulate some correct answers
      current.correct += 1
    }
    
    preferenceMap.set(pref, current)
  })

  preferenceMap.forEach((stats, preference) => {
    performanceByPreference.push({
      preference,
      correct: stats.correct,
      total: stats.total,
      percentage: Math.round((stats.correct / stats.total) * 100)
    })
  })

  const learningPreferenceIcons = {
    visual: Eye,
    auditory: Headphones,
    kinesthetic: Hand,
    "reading/writing": BookOpen
  }

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getPerformanceMessage = (percentage: number) => {
    if (percentage >= 90) return "Excellent! You're mastering this learning style!"
    if (percentage >= 80) return "Great job! You're doing well with this approach."
    if (percentage >= 60) return "Good effort! Keep practicing this learning style."
    return "Keep working on this learning style. Practice makes perfect!"
  }

  return (
    <div className="space-y-6">
      {/* Overall Results */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            {percentage >= 90 ? <Trophy className="h-8 w-8 text-yellow-500" /> : 
             percentage >= 70 ? <Target className="h-8 w-8 text-blue-500" /> : 
             <Brain className="h-8 w-8 text-purple-500" />}
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Display */}
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-primary">
              {score}/{totalQuestions}
            </div>
            <div className="text-2xl font-semibold">
              {percentage}%
            </div>
            <Progress value={percentage} className="h-3" />
            <p className="text-muted-foreground">
              {percentage >= 90 ? "Outstanding performance! 🎉" :
               percentage >= 80 ? "Great work! Keep it up! 👏" :
               percentage >= 70 ? "Good job! You're improving! 💪" :
               percentage >= 60 ? "Not bad! Keep practicing! 📚" :
               "Keep learning! Every attempt makes you better! 🌟"}
            </p>
          </div>

          {/* Time and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <Clock className="h-6 w-6 text-blue-500" />
              <div>
                <div className="font-semibold">Time Spent</div>
                <div className="text-sm text-muted-foreground">
                  {timeSpentMinutes}m {timeSpentSeconds}s
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <div>
                <div className="font-semibold">Correct Answers</div>
                <div className="text-sm text-muted-foreground">{score} questions</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <XCircle className="h-6 w-6 text-red-500" />
              <div>
                <div className="font-semibold">Incorrect Answers</div>
                <div className="text-sm text-muted-foreground">{totalQuestions - score} questions</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Preference Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Performance by Learning Style
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {performanceByPreference.map((perf) => {
            const Icon = learningPreferenceIcons[perf.preference]
            return (
              <div key={perf.preference} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <span className="font-medium capitalize">{perf.preference}</span>
                    <Badge variant="secondary">{perf.correct}/{perf.total}</Badge>
                  </div>
                  <span className={`font-semibold ${getPerformanceColor(perf.percentage)}`}>
                    {perf.percentage}%
                  </span>
                </div>
                <Progress value={perf.percentage} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {getPerformanceMessage(perf.percentage)}
                </p>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Learning Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                Strengths to Build On
              </h4>
              <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                {performanceByPreference
                  .filter(p => p.percentage >= 70)
                  .map(p => (
                    <li key={p.preference} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      {p.preference.charAt(0).toUpperCase() + p.preference.slice(1)} learning
                    </li>
                  ))}
              </ul>
            </div>
            
            <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
              <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                Areas for Improvement
              </h4>
              <ul className="text-sm text-orange-600 dark:text-orange-400 space-y-1">
                {performanceByPreference
                  .filter(p => p.percentage < 70)
                  .map(p => (
                    <li key={p.preference} className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      {p.preference.charAt(0).toUpperCase() + p.preference.slice(1)} learning
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onRetry} variant="outline" className="flex-1 sm:flex-none">
          Retry Quiz
        </Button>
        <Button onClick={onNewSession} className="flex-1 sm:flex-none">
          Start New Session
        </Button>
      </div>
    </div>
  )
} 