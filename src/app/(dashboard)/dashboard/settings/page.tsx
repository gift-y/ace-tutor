"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  Eye,
  Headphones,
  Hand,
  BookOpen,
  Save,
  X,
  Check,
  AlertTriangle,
  Moon,
  Sun,
  Monitor,
  Volume2,
  VolumeX,
  Mail,
  Smartphone,
  Clock,
  Target,
  Zap,
  Brain,
  Languages,
  Download,
  Trash2,
  Key,
  Lock,
  Unlock
} from "lucide-react"
import { cn } from "@/lib/utils"

interface UserSettings {
  // Account Settings
  email: string
  language: string
  timezone: string
  dateFormat: string
  
  // Notification Settings
  emailNotifications: boolean
  pushNotifications: boolean
  courseReminders: boolean
  achievementAlerts: boolean
  weeklyReports: boolean
  marketingEmails: boolean
  
  // Privacy Settings
  profileVisibility: "public" | "friends" | "private"
  showLearningProgress: boolean
  showAchievements: boolean
  allowDataCollection: boolean
  
  // Learning Preferences
  learningPreferences: string[]
  studyReminders: boolean
  reminderTime: string
  dailyGoal: number
  autoPlayVideos: boolean
  showSubtitles: boolean
  
  // Appearance
  theme: "light" | "dark" | "system"
  fontSize: "small" | "medium" | "large"
  reduceMotion: boolean
  highContrast: boolean
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<string>("account")
  const [isEditing, setIsEditing] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Mock user settings
  const [settings, setSettings] = useState<UserSettings>({
    email: "alex.johnson@example.com",
    language: "en",
    timezone: "America/Los_Angeles",
    dateFormat: "MM/DD/YYYY",
    emailNotifications: true,
    pushNotifications: true,
    courseReminders: true,
    achievementAlerts: true,
    weeklyReports: false,
    marketingEmails: false,
    profileVisibility: "public",
    showLearningProgress: true,
    showAchievements: true,
    allowDataCollection: true,
    learningPreferences: ["visual", "auditory"],
    studyReminders: true,
    reminderTime: "19:00",
    dailyGoal: 30,
    autoPlayVideos: false,
    showSubtitles: true,
    theme: "system",
    fontSize: "medium",
    reduceMotion: false,
    highContrast: false
  })

  const [editForm, setEditForm] = useState(settings)

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" }
  ]

  const timezones = [
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
    { value: "Europe/Paris", label: "Central European Time (CET)" },
    { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
    { value: "Australia/Sydney", label: "Australian Eastern Time (AET)" }
  ]

  const learningPreferenceIcons = {
    visual: Eye,
    auditory: Headphones,
    kinesthetic: Hand,
    "reading/writing": BookOpen
  }

  const handleSettingChange = (key: keyof UserSettings, value: any) => {
    setEditForm(prev => ({ ...prev, [key]: value }))
    setHasUnsavedChanges(true)
  }

  const handleSaveSettings = () => {
    setSettings(editForm)
    setIsEditing(false)
    setHasUnsavedChanges(false)
  }

  const handleCancelEdit = () => {
    setEditForm(settings)
    setIsEditing(false)
    setHasUnsavedChanges(false)
  }

  const handleLearningPreferenceToggle = (preference: string) => {
    const currentPreferences = editForm.learningPreferences
    const newPreferences = currentPreferences.includes(preference)
      ? currentPreferences.filter(p => p !== preference)
      : [...currentPreferences, preference]
    
    handleSettingChange('learningPreferences', newPreferences)
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
              <Settings className="h-8 w-8 text-primary" />
              Settings
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your account preferences and learning experience
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {hasUnsavedChanges && (
              <Badge variant="secondary" className="text-orange-600">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Unsaved Changes
              </Badge>
            )}
            
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancelEdit}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSaveSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Settings className="h-4 w-4 mr-2" />
                Edit Settings
              </Button>
            )}
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Learning
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Appearance
            </TabsTrigger>
          </TabsList>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editForm.email}
                        onChange={(e) => handleSettingChange('email', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{settings.email}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    {isEditing ? (
                      <Select value={editForm.language} onValueChange={(value) => handleSettingChange('language', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map(lang => (
                            <SelectItem key={lang.code} value={lang.code}>
                              {lang.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>{languages.find(l => l.code === settings.language)?.name}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    {isEditing ? (
                      <Select value={editForm.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timezones.map(tz => (
                            <SelectItem key={tz.value} value={tz.value}>
                              {tz.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{timezones.find(t => t.value === settings.timezone)?.label}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Key className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isEditing ? editForm.emailNotifications : settings.emailNotifications}
                      onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                      disabled={!isEditing}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Get notifications on your device</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isEditing ? editForm.pushNotifications : settings.pushNotifications}
                      onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                      disabled={!isEditing}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Course Reminders</p>
                      <p className="text-sm text-muted-foreground">Reminders for upcoming lessons</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isEditing ? editForm.courseReminders : settings.courseReminders}
                      onChange={(e) => handleSettingChange('courseReminders', e.target.checked)}
                      disabled={!isEditing}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Achievement Alerts</p>
                      <p className="text-sm text-muted-foreground">Celebrate your accomplishments</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isEditing ? editForm.achievementAlerts : settings.achievementAlerts}
                      onChange={(e) => handleSettingChange('achievementAlerts', e.target.checked)}
                      disabled={!isEditing}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Reports</p>
                      <p className="text-sm text-muted-foreground">Summary of your learning progress</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isEditing ? editForm.weeklyReports : settings.weeklyReports}
                      onChange={(e) => handleSettingChange('weeklyReports', e.target.checked)}
                      disabled={!isEditing}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing Emails</p>
                      <p className="text-sm text-muted-foreground">Receive promotional content</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isEditing ? editForm.marketingEmails : settings.marketingEmails}
                      onChange={(e) => handleSettingChange('marketingEmails', e.target.checked)}
                      disabled={!isEditing}
                      className="rounded"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Profile Visibility</Label>
                    {isEditing ? (
                      <Select value={editForm.profileVisibility} onValueChange={(value) => handleSettingChange('profileVisibility', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public - Anyone can see your profile</SelectItem>
                          <SelectItem value="friends">Friends Only - Only your connections</SelectItem>
                          <SelectItem value="private">Private - Only you</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-2 bg-muted rounded-md">
                        <span className="capitalize">{settings.profileVisibility}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Learning Progress</p>
                      <p className="text-sm text-muted-foreground">Display your course progress to others</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isEditing ? editForm.showLearningProgress : settings.showLearningProgress}
                      onChange={(e) => handleSettingChange('showLearningProgress', e.target.checked)}
                      disabled={!isEditing}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Achievements</p>
                      <p className="text-sm text-muted-foreground">Display your badges and accomplishments</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isEditing ? editForm.showAchievements : settings.showAchievements}
                      onChange={(e) => handleSettingChange('showAchievements', e.target.checked)}
                      disabled={!isEditing}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Data Collection</p>
                      <p className="text-sm text-muted-foreground">Allow us to collect usage data to improve the platform</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isEditing ? editForm.allowDataCollection : settings.allowDataCollection}
                      onChange={(e) => handleSettingChange('allowDataCollection', e.target.checked)}
                      disabled={!isEditing}
                      className="rounded"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learning Preferences */}
          <TabsContent value="learning" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Label>Learning Styles</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(learningPreferenceIcons).map(([key, Icon]) => (
                        <div
                          key={key}
                          className={cn(
                            "p-3 border rounded-lg cursor-pointer transition-colors",
                            (isEditing ? editForm.learningPreferences : settings.learningPreferences).includes(key)
                              ? "border-primary bg-primary/5"
                              : "border-muted hover:border-primary/50"
                          )}
                          onClick={() => isEditing && handleLearningPreferenceToggle(key)}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <span className="text-sm capitalize">{key}</span>
                            {(isEditing ? editForm.learningPreferences : settings.learningPreferences).includes(key) && (
                              <Check className="h-4 w-4 ml-auto text-primary" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dailyGoal">Daily Study Goal (minutes)</Label>
                    {isEditing ? (
                      <Input
                        id="dailyGoal"
                        type="number"
                        min="15"
                        max="240"
                        step="15"
                        value={editForm.dailyGoal}
                        onChange={(e) => handleSettingChange('dailyGoal', parseInt(e.target.value))}
                      />
                    ) : (
                      <div className="p-2 bg-muted rounded-md">
                        <span>{settings.dailyGoal} minutes</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reminderTime">Study Reminder Time</Label>
                    {isEditing ? (
                      <Input
                        id="reminderTime"
                        type="time"
                        value={editForm.reminderTime}
                        onChange={(e) => handleSettingChange('reminderTime', e.target.value)}
                      />
                    ) : (
                      <div className="p-2 bg-muted rounded-md">
                        <span>{settings.reminderTime}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Study Reminders</p>
                      <p className="text-sm text-muted-foreground">Get reminded to study daily</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isEditing ? editForm.studyReminders : settings.studyReminders}
                      onChange={(e) => handleSettingChange('studyReminders', e.target.checked)}
                      disabled={!isEditing}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-play Videos</p>
                      <p className="text-sm text-muted-foreground">Automatically play video content</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isEditing ? editForm.autoPlayVideos : settings.autoPlayVideos}
                      onChange={(e) => handleSettingChange('autoPlayVideos', e.target.checked)}
                      disabled={!isEditing}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Subtitles</p>
                      <p className="text-sm text-muted-foreground">Display subtitles in videos</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isEditing ? editForm.showSubtitles : settings.showSubtitles}
                      onChange={(e) => handleSettingChange('showSubtitles', e.target.checked)}
                      disabled={!isEditing}
                      className="rounded"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance & Accessibility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    {isEditing ? (
                      <Select value={editForm.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">
                            <div className="flex items-center gap-2">
                              <Sun className="h-4 w-4" />
                              Light
                            </div>
                          </SelectItem>
                          <SelectItem value="dark">
                            <div className="flex items-center gap-2">
                              <Moon className="h-4 w-4" />
                              Dark
                            </div>
                          </SelectItem>
                          <SelectItem value="system">
                            <div className="flex items-center gap-2">
                              <Monitor className="h-4 w-4" />
                              System
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-2 bg-muted rounded-md capitalize">
                        <span>{settings.theme}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Font Size</Label>
                    {isEditing ? (
                      <Select value={editForm.fontSize} onValueChange={(value) => handleSettingChange('fontSize', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-2 bg-muted rounded-md capitalize">
                        <span>{settings.fontSize}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Reduce Motion</p>
                      <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isEditing ? editForm.reduceMotion : settings.reduceMotion}
                      onChange={(e) => handleSettingChange('reduceMotion', e.target.checked)}
                      disabled={!isEditing}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">High Contrast</p>
                      <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isEditing ? editForm.highContrast : settings.highContrast}
                      onChange={(e) => handleSettingChange('highContrast', e.target.checked)}
                      disabled={!isEditing}
                      className="rounded"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}