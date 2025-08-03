"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Award, 
  Calendar,
  BookOpen,
  CheckCircle,
  Star,
  Activity,
  Zap,
  Brain,
  Trophy
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CourseProgressProps {
  courseId: string
  title: string
  progress: number
  completedLessons: number
  totalLessons: number
  timeSpent: number // in hours
  totalDuration: number // in hours
  startDate: Date
  estimatedCompletion: Date
  learningStreak: number
  averageScore: number
  difficulty: string
  status: string
  achievements: Achievement[]
  recentActivity: Activity[]
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earnedAt: Date
  type: "completion" | "streak" | "score" | "participation"
}

interface Activity {
  id: string
  type: "lesson_completed" | "quiz_taken" | "assignment_submitted" | "milestone_reached"
  title: string
  description: string
  timestamp: Date
  score?: number
}

export default function CourseProgress({
  courseId,
  title,
  progress,
  completedLessons,
  totalLessons,
  timeSpent,
  totalDuration,
  startDate,
  estimatedCompletion,
  learningStreak,
  averageScore,
  difficulty,
  status,
  achievements,
  recentActivity
}: CourseProgressProps) {
  const getAchievementIcon = (type: string) => {
    switch (type) {
      case "completion": return Trophy
      case "streak": return Zap
      case "score": return Star
      case "participation": return Activity
      default: return Award
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "lesson_completed": return CheckCircle
      case "quiz_taken": return Brain
      case "assignment_submitted": return Target
      case "milestone_reached": return Award
      default: return Activity
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "lesson_completed": return "text-green-600"
      case "quiz_taken": return "text-blue-600"
      case "assignment_submitted": return "text-purple-600"
      case "milestone_reached": return "text-orange-600"
      default: return "text-gray-600"
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
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    return formatDate(date)
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600"
    if (progress >= 60) return "text-blue-600"
    if (progress >= 40) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Main Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Overall Progress</span>
              <span className={cn("font-bold", getProgressColor(progress))}>
                {progress}%
              </span>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {completedLessons} of {totalLessons} lessons completed
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {completedLessons}
              </div>
              <div className="text-sm text-muted-foreground">Lessons Done</div>
            </div>
            
            <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {timeSpent}h
              </div>
              <div className="text-sm text-muted-foreground">Time Spent</div>
            </div>
            
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {learningStreak}
              </div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            
            <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {averageScore}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Score</div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            <h4 className="font-semibold">Timeline</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Started:</span>
                <span className="font-medium">{formatDate(startDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Est. Completion:</span>
                <span className="font-medium">{formatDate(estimatedCompletion)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          {achievements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map(achievement => {
                const Icon = getAchievementIcon(achievement.type)
                return (
                  <div key={achievement.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                      <Icon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Earned {formatDate(achievement.earnedAt)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No achievements yet. Keep learning to earn badges!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map(activity => {
              const Icon = getActivityIcon(activity.type)
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center mt-1",
                    getActivityColor(activity.type).replace('text-', 'bg-').replace('-600', '-100 dark:bg-') + '00'
                  )}>
                    <Icon className={cn("h-4 w-4", getActivityColor(activity.type))} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{activity.title}</h4>
                      {activity.score && (
                        <Badge variant="secondary" className="text-xs">
                          {activity.score}%
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Learning Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Learning Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5" />
                <h4 className="font-semibold">Learning Streak</h4>
              </div>
              <p className="text-sm opacity-90">
                You've been learning for {learningStreak} consecutive days. Keep up the great work!
              </p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5" />
                <h4 className="font-semibold">Progress Goal</h4>
              </div>
              <p className="text-sm opacity-90">
                {100 - progress}% remaining to complete this course. You're on track!
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Study Recommendations</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Study for 30 minutes daily to maintain your streak</li>
              <li>• Focus on completing 2-3 lessons per week</li>
              <li>• Review completed lessons to reinforce learning</li>
              <li>• Take practice quizzes to test your understanding</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 