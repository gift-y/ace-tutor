"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bot, 
  BookOpen, 
  Video, 
  Image, 
  Headphones, 
  Eye, 
  Hand, 
  Brain,
  Play,
  Pause,
  Volume2,
  Download,
  Share2,
  Heart,
  MessageCircle,
  Sparkles,
  Target,
  Clock,
  TrendingUp,
  Lightbulb,
  Zap,
  Book,
  PenTool,
  Mic,
  Camera
} from "lucide-react"
import { cn } from "@/lib/utils"
import { LearningPreference, learningPreferenceDescriptions, subjects } from "@/utils/quiz-data"
import ContentPreview from "@/components/content-preview"

interface LearningContent {
  id: string
  type: "text" | "video" | "image" | "audio" | "interactive"
  title: string
  description: string
  content: string
  learningPreference: LearningPreference
  subject: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration?: number // in minutes
  tags: string[]
  createdAt: Date
  likes: number
  views: number
}

interface AIResponse {
  content: string
  type: "text" | "video" | "image" | "audio" | "interactive"
  suggestions: string[]
  followUpQuestions: string[]
}

export default function AITutorPage() {
  const [userLearningPreferences, setUserLearningPreferences] = useState<LearningPreference[]>(["visual", "auditory"])
  const [selectedSubject, setSelectedSubject] = useState<string>("Mathematics")
  const [userQuery, setUserQuery] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [generatedContent, setGeneratedContent] = useState<AIResponse | null>(null)
  const [activeTab, setActiveTab] = useState<string>("chat")
  const [chatHistory, setChatHistory] = useState<Array<{query: string, response: AIResponse}>>([])

  // Learning preference icons
  const learningPreferenceIcons = {
    visual: Eye,
    auditory: Headphones,
    kinesthetic: Hand,
    "reading/writing": BookOpen
  }

  // Mock learning content database
  const mockLearningContent: LearningContent[] = [
    {
      id: "1",
      type: "video",
      title: "Introduction to Algebra",
      description: "Learn the basics of algebraic expressions and equations",
      content: "https://example.com/video1.mp4",
      learningPreference: "visual",
      subject: "Mathematics",
      difficulty: "beginner",
      duration: 15,
      tags: ["algebra", "equations", "variables"],
      createdAt: new Date(),
      likes: 245,
      views: 1200
    },
    {
      id: "2",
      type: "text",
      title: "Understanding Photosynthesis",
      description: "A comprehensive guide to how plants convert light into energy",
      content: "Photosynthesis is the process by which plants convert light energy into chemical energy...",
      learningPreference: "reading/writing",
      subject: "Science",
      difficulty: "intermediate",
      tags: ["biology", "plants", "energy"],
      createdAt: new Date(),
      likes: 189,
      views: 890
    },
    {
      id: "3",
      type: "interactive",
      title: "Interactive Grammar Practice",
      description: "Practice English grammar through interactive exercises",
      content: "interactive-grammar-module",
      learningPreference: "kinesthetic",
      subject: "Language",
      difficulty: "beginner",
      duration: 20,
      tags: ["grammar", "english", "practice"],
      createdAt: new Date(),
      likes: 312,
      views: 1500
    },
    {
      id: "4",
      type: "audio",
      title: "French Pronunciation Guide",
      description: "Learn proper French pronunciation through audio lessons",
      content: "https://example.com/audio1.mp3",
      learningPreference: "auditory",
      subject: "Language",
      difficulty: "beginner",
      duration: 25,
      tags: ["french", "pronunciation", "audio"],
      createdAt: new Date(),
      likes: 156,
      views: 720
    }
  ]

  // Generate AI response based on learning preferences
  const generateAIResponse = async (query: string): Promise<AIResponse> => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const responses = {
      visual: {
        content: `Here's a visual explanation of ${query}:\n\n📊 **Key Concepts:**\n• Visual representation of the concept\n• Diagrams and charts to illustrate\n• Step-by-step visual process\n\n🎨 **Visual Learning Tips:**\n• Create mind maps\n• Use color coding\n• Draw diagrams\n• Watch explanatory videos`,
        type: "image" as const,
        suggestions: ["Create a mind map", "Watch a video tutorial", "Use visual flashcards"],
        followUpQuestions: ["Would you like me to generate a diagram?", "Should I create a visual timeline?", "Would a flowchart help?"]
      },
      auditory: {
        content: `Let me explain ${query} through audio:\n\n🎵 **Audio Learning Approach:**\n• Listen to explanations\n• Repeat concepts aloud\n• Use mnemonic devices\n• Discuss with others\n\n🔊 **Auditory Learning Tips:**\n• Record yourself explaining\n• Listen to podcasts\n• Use verbal repetition\n• Join study groups`,
        type: "audio" as const,
        suggestions: ["Listen to a podcast", "Record your explanation", "Join a discussion group"],
        followUpQuestions: ["Would you like an audio explanation?", "Should I create a mnemonic device?", "Would a discussion help?"]
      },
      kinesthetic: {
        content: `Let's learn ${query} through hands-on activities:\n\n🖐️ **Hands-on Learning:**\n• Physical manipulation of concepts\n• Real-world applications\n• Interactive exercises\n• Movement-based learning\n\n⚡ **Kinesthetic Learning Tips:**\n• Use physical objects\n• Act out concepts\n• Build models\n• Take frequent breaks`,
        type: "interactive" as const,
        suggestions: ["Build a physical model", "Act out the concept", "Use manipulatives"],
        followUpQuestions: ["Would you like to build something?", "Should we act this out?", "Would hands-on practice help?"]
      },
      "reading/writing": {
        content: `Here's a detailed written explanation of ${query}:\n\n📝 **Written Learning Approach:**\n• Comprehensive text explanations\n• Note-taking strategies\n• Written summaries\n• Reading materials\n\n✍️ **Reading/Writing Tips:**\n• Take detailed notes\n• Write summaries\n• Create outlines\n• Read extensively`,
        type: "text" as const,
        suggestions: ["Write a summary", "Create an outline", "Take detailed notes"],
        followUpQuestions: ["Would you like a detailed explanation?", "Should I provide reading materials?", "Would written exercises help?"]
      }
    }

    // Return response based on primary learning preference
    const primaryPreference = userLearningPreferences[0]
    return responses[primaryPreference]
  }

  const handleGenerateContent = async () => {
    if (!userQuery.trim()) return

    setIsGenerating(true)
    try {
      const response = await generateAIResponse(userQuery)
      setGeneratedContent(response)
      setChatHistory(prev => [...prev, { query: userQuery, response }])
      setUserQuery("")
    } catch (error) {
      console.error("Error generating content:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const getContentIcon = (type: string) => {
    switch (type) {
      case "video": return Video
      case "text": return BookOpen
      case "image": return Image
      case "audio": return Headphones
      case "interactive": return Hand
      default: return Bot
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Bot className="h-8 w-8 text-primary" />
              AI Learning Tutor
            </h1>
            <p className="text-muted-foreground mt-2">
              Personalized learning content tailored to your preferences
            </p>
          </div>
          
          {/* Learning Preferences Display */}
          <div className="flex items-center gap-2">
            {userLearningPreferences.map(pref => {
              const Icon = learningPreferenceIcons[pref]
              return (
                <Badge key={pref} variant="secondary" className="flex items-center gap-1">
                  <Icon className="h-3 w-3" />
                  {pref.charAt(0).toUpperCase() + pref.slice(1)}
                </Badge>
              )
            })}
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              AI Chat
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              Learning Content
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Create Content
            </TabsTrigger>
          </TabsList>

          {/* AI Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Ask Your AI Tutor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask me anything about your studies..."
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleGenerateContent()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleGenerateContent} 
                    disabled={isGenerating || !userQuery.trim()}
                    className="flex items-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>

                {/* Generated Content Display */}
                {generatedContent && (
                  <div className="space-y-6">
                    <Card className="mt-4">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          {(() => {
                            const Icon = getContentIcon(generatedContent.type)
                            return <Icon className="h-5 w-5 text-primary" />
                          })()}
                          <Badge variant="outline" className="capitalize">
                            {generatedContent.type}
                          </Badge>
                        </div>
                        
                        <div className="prose dark:prose-invert max-w-none">
                          <pre className="whitespace-pre-wrap font-sans text-sm">
                            {generatedContent.content}
                          </pre>
                        </div>

                        {/* Suggestions */}
                        <div className="mt-6">
                          <h4 className="font-semibold mb-2">Suggested Actions:</h4>
                          <div className="flex flex-wrap gap-2">
                            {generatedContent.suggestions.map((suggestion, index) => (
                              <Button key={index} variant="outline" size="sm">
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        </div>

                        {/* Follow-up Questions */}
                        <div className="mt-6">
                          <h4 className="font-semibold mb-2">Follow-up Questions:</h4>
                          <div className="space-y-2">
                            {generatedContent.followUpQuestions.map((question, index) => (
                              <Button 
                                key={index} 
                                variant="ghost" 
                                size="sm" 
                                className="justify-start text-left h-auto p-2"
                                onClick={() => setUserQuery(question)}
                              >
                                {question}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Content Preview */}
                    <div>
                      <h3 className="font-semibold mb-4">Generated Learning Content</h3>
                      <ContentPreview
                        type={generatedContent.type}
                        title={`AI Generated ${generatedContent.type.charAt(0).toUpperCase() + generatedContent.type.slice(1)}`}
                        description="Personalized content based on your learning preferences"
                        content={generatedContent.content}
                        duration={15}
                        difficulty="intermediate"
                        learningPreference={userLearningPreferences[0]}
                        onPlay={() => console.log("Playing content")}
                        onPause={() => console.log("Paused content")}
                        onDownload={() => console.log("Downloading content")}
                        onShare={() => console.log("Sharing content")}
                        onLike={() => console.log("Liked content")}
                      />
                    </div>
                  </div>
                )}

                {/* Chat History */}
                {chatHistory.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Recent Conversations</h3>
                    {chatHistory.slice(-3).map((chat, index) => (
                      <Card key={index} className="p-4">
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            <strong>You:</strong> {chat.query}
                          </p>
                          <p className="text-sm">
                            <strong>AI Tutor:</strong> {chat.response.content.substring(0, 100)}...
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learning Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filters */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Subject</label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map(subject => (
                          <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Content Type</label>
                    <div className="space-y-2 mt-2">
                      {["text", "video", "image", "audio", "interactive"].map(type => (
                        <label key={type} className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm capitalize">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Learning Preference</label>
                    <div className="space-y-2 mt-2">
                      {userLearningPreferences.map(pref => (
                        <label key={pref} className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm capitalize">{pref}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Content Grid */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 gap-6">
                  {mockLearningContent
                    .filter(content => content.subject === selectedSubject)
                    .map(content => (
                      <ContentPreview
                        key={content.id}
                        type={content.type}
                        title={content.title}
                        description={content.description}
                        content={content.content}
                        duration={content.duration}
                        difficulty={content.difficulty}
                        learningPreference={content.learningPreference}
                        onPlay={() => console.log(`Playing ${content.title}`)}
                        onPause={() => console.log(`Paused ${content.title}`)}
                        onDownload={() => console.log(`Downloading ${content.title}`)}
                        onShare={() => console.log(`Sharing ${content.title}`)}
                        onLike={() => console.log(`Liked ${content.title}`)}
                      />
                    ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Create Content Tab */}
          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Content Creation Tools */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PenTool className="h-5 w-5" />
                    Create Learning Materials
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="h-24 flex flex-col items-center gap-2">
                      <Video className="h-6 w-6" />
                      <span className="text-sm">Video Lesson</span>
                    </Button>
                    <Button className="h-24 flex flex-col items-center gap-2">
                      <Image className="h-6 w-6" />
                      <span className="text-sm">Infographic</span>
                    </Button>
                    <Button className="h-24 flex flex-col items-center gap-2">
                      <Mic className="h-6 w-6" />
                      <span className="text-sm">Audio Guide</span>
                    </Button>
                    <Button className="h-24 flex flex-col items-center gap-2">
                      <Hand className="h-6 w-6" />
                      <span className="text-sm">Interactive Quiz</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* AI Content Generator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    AI Content Generator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Content Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lesson">Lesson Plan</SelectItem>
                        <SelectItem value="quiz">Quiz Questions</SelectItem>
                        <SelectItem value="summary">Study Summary</SelectItem>
                        <SelectItem value="exercises">Practice Exercises</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Topic</label>
                    <Input placeholder="Enter the topic you want to learn about" />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Learning Style Focus</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select learning style" />
                      </SelectTrigger>
                      <SelectContent>
                        {userLearningPreferences.map(pref => (
                          <SelectItem key={pref} value={pref}>
                            {pref.charAt(0).toUpperCase() + pref.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Content
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Learning Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Your Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {userLearningPreferences.map(pref => {
                    const Icon = learningPreferenceIcons[pref]
                    return (
                      <div key={pref} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5" />
                          <span className="font-medium capitalize">{pref}</span>
                        </div>
                        <Progress value={Math.random() * 100} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          {learningPreferenceDescriptions[pref]}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}