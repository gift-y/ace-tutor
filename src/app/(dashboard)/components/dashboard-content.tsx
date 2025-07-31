"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
  Calendar,
  Play,
  CheckCircle,
  AlertCircle,
  Brain,
  Headphones,
  Hand,
  Eye,
} from "lucide-react"
import { ModeToggle } from "@/components/darkMode-toggle"

export function DashboardContent() {
  return (
    <div className="grid gap-4">
        <ModeToggle />
      {/* Welcome Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47.5</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Badges earned</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Overall completion</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Current Courses */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Current Courses</CardTitle>
            <CardDescription>Your active learning paths with AI-powered recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Advanced Mathematics</p>
                  <p className="text-sm text-gray-500">Calculus & Linear Algebra</p>
                  <div className="mt-2">
                    <Progress value={75} className="h-2" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Visual</Badge>
                  <Button size="sm" variant="outline">
                    <Play className="w-4 h-4 mr-1" />
                    Continue
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Data Science Fundamentals</p>
                  <p className="text-sm text-gray-500">Python & Statistics</p>
                  <div className="mt-2">
                    <Progress value={45} className="h-2" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Kinesthetic</Badge>
                  <Button size="sm" variant="outline">
                    <Play className="w-4 h-4 mr-1" />
                    Continue
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Headphones className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Spanish Conversation</p>
                  <p className="text-sm text-gray-500">Intermediate Level</p>
                  <div className="mt-2">
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Auditory</Badge>
                  <Button size="sm" variant="outline">
                    <Play className="w-4 h-4 mr-1" />
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Assignments */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
            <CardDescription>AI-generated tasks based on your learning style</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Calculus Problem Set</p>
                  <p className="text-xs text-muted-foreground">Due tomorrow</p>
                </div>
                <Badge variant="destructive">High</Badge>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-yellow-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Python Data Analysis</p>
                  <p className="text-xs text-muted-foreground">Due in 3 days</p>
                </div>
                <Badge variant="secondary">Medium</Badge>
              </div>

              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Spanish Essay</p>
                  <p className="text-xs text-muted-foreground">Due next week</p>
                </div>
                <Badge variant="outline">Low</Badge>
              </div>

              <div className="pt-2">
                <Button className="w-full bg-transparent" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  View All Assignments
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Style Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>AI Learning Recommendations</CardTitle>
          <CardDescription>Personalized suggestions based on your learning preferences and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <Eye className="w-8 h-8 text-blue-500" />
              <div>
                <p className="font-medium">Visual Learning</p>
                <p className="text-sm text-muted-foreground">Try mind maps for math concepts</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <Headphones className="w-8 h-8 text-green-500" />
              <div>
                <p className="font-medium">Auditory Learning</p>
                <p className="text-sm text-muted-foreground">Listen to Spanish podcasts</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <Hand className="w-8 h-8 text-purple-500" />
              <div>
                <p className="font-medium">Kinesthetic Learning</p>
                <p className="text-sm text-muted-foreground">Code along with tutorials</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <BookOpen className="w-8 h-8 text-orange-500" />
              <div>
                <p className="font-medium">Reading/Writing</p>
                <p className="text-sm text-muted-foreground">Take detailed notes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your learning journey over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-9 w-9">
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">Completed "Linear Algebra Basics"</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <Badge variant="secondary">+50 XP</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Avatar className="h-9 w-9">
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">Earned "Data Visualization" badge</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
              <Trophy className="w-4 h-4 text-yellow-500" />
            </div>

            <div className="flex items-center space-x-4">
              <Avatar className="h-9 w-9">
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">Started "Advanced Python" course</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
              <Badge variant="outline">New</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}