"use client"

import React, { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  Camera, 
  Edit, 
  Save, 
  X, 
  Upload,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Target,
  Award,
  Settings,
  Shield,
  Bell,
  Palette,
  Globe,
  Star,
  Trophy,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle,
  Eye,
  Headphones,
  Hand,
  Brain,
  Zap,
  Heart,
  Share2,
  Download
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserProfile {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  location?: string
  bio?: string
  dateOfBirth?: Date
  profilePicture?: string
  learningPreferences: string[]
  joinDate: Date
  lastActive: Date
  totalCourses: number
  completedCourses: number
  totalStudyTime: number // in hours
  learningStreak: number
  achievements: number
  level: number
  experience: number
  nextLevelExp: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earnedAt: Date
  type: "completion" | "streak" | "score" | "participation"
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<string>("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mock user profile data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: "1",
    username: "alex_johnson",
    email: "alex.johnson@example.com",
    firstName: "Alex",
    lastName: "Johnson",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate learner exploring mathematics and science. Always eager to discover new concepts and improve my skills.",
    dateOfBirth: new Date("1995-03-15"),
    profilePicture: "/placeholder.svg",
    learningPreferences: ["visual", "auditory"],
    joinDate: new Date("2024-01-15"),
    lastActive: new Date(),
    totalCourses: 8,
    completedCourses: 3,
    totalStudyTime: 156,
    learningStreak: 12,
    achievements: 15,
    level: 7,
    experience: 1250,
    nextLevelExp: 1500
  })

  // Mock achievements data
  const achievements: Achievement[] = [
    {
      id: "1",
      title: "First Course Completed",
      description: "Successfully completed your first course",
      icon: "🎓",
      earnedAt: new Date("2024-02-01"),
      type: "completion"
    },
    {
      id: "2",
      title: "7-Day Learning Streak",
      description: "Learned for 7 consecutive days",
      icon: "🔥",
      earnedAt: new Date("2024-02-15"),
      type: "streak"
    },
    {
      id: "3",
      title: "Perfect Score",
      description: "Achieved 100% on a quiz",
      icon: "⭐",
      earnedAt: new Date("2024-03-01"),
      type: "score"
    },
    {
      id: "4",
      title: "Active Participant",
      description: "Participated in 10 discussions",
      icon: "💬",
      earnedAt: new Date("2024-03-10"),
      type: "participation"
    }
  ]

  const [editForm, setEditForm] = useState({
    username: userProfile.username,
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    phone: userProfile.phone || "",
    location: userProfile.location || "",
    bio: userProfile.bio || ""
  })

  const learningPreferenceIcons = {
    visual: Eye,
    auditory: Headphones,
    kinesthetic: Hand,
    "reading/writing": BookOpen
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          // Update profile picture (in real app, this would be uploaded to server)
          setUserProfile(prev => ({
            ...prev,
            profilePicture: URL.createObjectURL(file)
          }))
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleSaveProfile = () => {
    setUserProfile(prev => ({
      ...prev,
      ...editForm
    }))
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditForm({
      username: userProfile.username,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      phone: userProfile.phone || "",
      location: userProfile.location || "",
      bio: userProfile.bio || ""
    })
    setIsEditing(false)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getLevelProgress = () => {
    return (userProfile.experience / userProfile.nextLevelExp) * 100
  }

  const getLearningPreferenceIcon = (preference: string) => {
    const Icon = learningPreferenceIcons[preference as keyof typeof learningPreferenceIcons]
    return Icon || BookOpen
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <User className="h-8 w-8 text-primary" />
              Profile
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your profile and learning preferences
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancelEdit}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSaveProfile}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Picture and Basic Info */}
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      {/* Profile Picture */}
                      <div className="relative inline-block">
                        <Avatar className="h-32 w-32 mx-auto">
                          <AvatarImage src={userProfile.profilePicture} alt={userProfile.firstName} />
                          <AvatarFallback className="text-2xl">
                            {userProfile.firstName[0]}{userProfile.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        
                        {/* Upload Overlay */}
                        <Button
                          size="sm"
                          variant="secondary"
                          className="absolute bottom-0 right-0 h-8 w-8 rounded-full p-0"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                        
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </div>

                      {/* Upload Progress */}
                      {isUploading && (
                        <div className="space-y-2">
                          <Progress value={uploadProgress} className="h-2" />
                          <p className="text-sm text-muted-foreground">
                            Uploading... {uploadProgress}%
                          </p>
                        </div>
                      )}

                      {/* Level and Experience */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          <Trophy className="h-5 w-5 text-yellow-500" />
                          <span className="font-semibold">Level {userProfile.level}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>Experience</span>
                            <span>{userProfile.experience} / {userProfile.nextLevelExp}</span>
                          </div>
                          <Progress value={getLevelProgress()} className="h-2" />
                        </div>
                      </div>

                      {/* Learning Preferences */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Learning Preferences</h4>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {userProfile.learningPreferences.map(pref => {
                            const Icon = getLearningPreferenceIcon(pref)
                            return (
                              <Badge key={pref} variant="secondary" className="flex items-center gap-1">
                                <Icon className="h-3 w-3" />
                                {pref.charAt(0).toUpperCase() + pref.slice(1)}
                              </Badge>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Profile Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        {isEditing ? (
                          <Input
                            id="username"
                            value={editForm.username}
                            onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                          />
                        ) : (
                          <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                            <span className="font-medium">@{userProfile.username}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{userProfile.email}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        {isEditing ? (
                          <Input
                            id="firstName"
                            value={editForm.firstName}
                            onChange={(e) => setEditForm(prev => ({ ...prev, firstName: e.target.value }))}
                          />
                        ) : (
                          <div className="p-2 bg-muted rounded-md">
                            <span>{userProfile.firstName}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        {isEditing ? (
                          <Input
                            id="lastName"
                            value={editForm.lastName}
                            onChange={(e) => setEditForm(prev => ({ ...prev, lastName: e.target.value }))}
                          />
                        ) : (
                          <div className="p-2 bg-muted rounded-md">
                            <span>{userProfile.lastName}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            value={editForm.phone}
                            onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="Enter phone number"
                          />
                        ) : (
                          <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{userProfile.phone || "Not provided"}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        {isEditing ? (
                          <Input
                            id="location"
                            value={editForm.location}
                            onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                            placeholder="Enter location"
                          />
                        ) : (
                          <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{userProfile.location || "Not provided"}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      {isEditing ? (
                        <textarea
                          id="bio"
                          value={editForm.bio}
                          onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                          className="w-full min-h-[100px] p-3 border border-input rounded-md bg-background resize-none"
                          placeholder="Tell us about yourself..."
                        />
                      ) : (
                        <div className="p-3 bg-muted rounded-md">
                          <span>{userProfile.bio || "No bio provided"}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Account Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Member since</p>
                          <p className="font-medium">{formatDate(userProfile.joinDate)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Last active</p>
                          <p className="font-medium">{formatDate(userProfile.lastActive)}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements ({achievements.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map(achievement => (
                    <div key={achievement.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Earned {formatDate(achievement.earnedAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Courses</p>
                      <p className="text-2xl font-bold">{userProfile.totalCourses}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold">{userProfile.completedCourses}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                      <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Study Time</p>
                      <p className="text-2xl font-bold">{userProfile.totalStudyTime}h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                      <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Learning Streak</p>
                      <p className="text-2xl font-bold">{userProfile.learningStreak} days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Course Completion Rate</span>
                    <span className="font-semibold">
                      {Math.round((userProfile.completedCourses / userProfile.totalCourses) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(userProfile.completedCourses / userProfile.totalCourses) * 100} 
                    className="h-3" 
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Study Habits</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Average study session: 45 minutes</li>
                        <li>• Most active time: 7:00 PM - 9:00 PM</li>
                        <li>• Preferred subjects: Mathematics, Science</li>
                        <li>• Learning style: Visual & Auditory</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Recent Activity</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Completed Algebra Quiz - 95%</li>
                        <li>• Started Biology Module 3</li>
                        <li>• Earned "Perfect Score" achievement</li>
                        <li>• Joined Study Group: Math Enthusiasts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Course Reminders</p>
                        <p className="text-sm text-muted-foreground">Get reminded about upcoming lessons</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Achievement Alerts</p>
                        <p className="text-sm text-muted-foreground">Celebrate your accomplishments</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Profile Visibility</p>
                        <p className="text-sm text-muted-foreground">Who can see your profile</p>
                      </div>
                      <select className="px-3 py-1 border rounded text-sm">
                        <option>Public</option>
                        <option>Friends Only</option>
                        <option>Private</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                      </div>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Data Export</p>
                        <p className="text-sm text-muted-foreground">Download your learning data</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}