"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Download, 
  Share2, 
  Heart, 
  Eye,
  BookOpen,
  Video,
  Image,
  Headphones,
  Hand,
  Clock,
  Target,
  CheckCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ContentPreviewProps {
  type: "text" | "video" | "image" | "audio" | "interactive"
  title: string
  description: string
  content: string
  duration?: number
  difficulty: "beginner" | "intermediate" | "advanced"
  learningPreference: string
  onPlay?: () => void
  onPause?: () => void
  onDownload?: () => void
  onShare?: () => void
  onLike?: () => void
}

export default function ContentPreview({
  type,
  title,
  description,
  content,
  duration,
  difficulty,
  learningPreference,
  onPlay,
  onPause,
  onDownload,
  onShare,
  onLike
}: ContentPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const getContentIcon = () => {
    switch (type) {
      case "video": return Video
      case "text": return BookOpen
      case "image": return Image
      case "audio": return Headphones
      case "interactive": return Hand
      default: return BookOpen
    }
  }

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (isPlaying) {
      onPause?.()
    } else {
      onPlay?.()
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike?.()
  }

  const renderContent = () => {
    switch (type) {
      case "video":
        return (
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-sm opacity-75">Video Content</p>
                <p className="text-xs opacity-50">{content}</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handlePlayPause}
                  className="h-8 w-8 p-0"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Progress value={progress} className="flex-1 h-1" />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsMuted(!isMuted)}
                  className="h-8 w-8 p-0 text-white"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        )

      case "audio":
        return (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-full p-3">
                <Headphones className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Audio Lesson</h3>
                <p className="text-sm opacity-90">{description}</p>
                <div className="flex items-center gap-4 mt-3">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handlePlayPause}
                    className="h-8 w-8 p-0"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Progress value={progress} className="flex-1 h-1" />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsMuted(!isMuted)}
                    className="h-8 w-8 p-0 text-white"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      case "image":
        return (
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Image className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Visual Content</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{content}</p>
            </div>
          </div>
        )

      case "interactive":
        return (
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-full p-3">
                <Hand className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Interactive Exercise</h3>
                <p className="text-sm opacity-90">{description}</p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="secondary" className="text-xs">
                    Start Exercise
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs border-white/20 text-white">
                    Preview
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      case "text":
      default:
        return (
          <div className="bg-white dark:bg-gray-800 border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <BookOpen className="h-6 w-6 text-blue-500 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Text Content</h3>
                <div className="prose dark:prose-invert max-w-none text-sm">
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-4">
                    {content}
                  </p>
                </div>
                <Button size="sm" variant="outline" className="mt-3">
                  Read More
                </Button>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {React.createElement(getContentIcon(), { className: "h-4 w-4 text-primary" })}
              <Badge variant="outline" className="capitalize text-xs">
                {type}
              </Badge>
              <Badge className={cn("text-xs", getDifficultyColor())}>
                {difficulty}
              </Badge>
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleLike}
              className={cn("h-8 w-8 p-0", isLiked && "text-red-500")}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onShare}
              className="h-8 w-8 p-0"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {renderContent()}

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {duration && (
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {duration}m
              </span>
            )}
            <span className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              {learningPreference}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={onDownload}>
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button size="sm">
              <CheckCircle className="h-4 w-4 mr-1" />
              Start Learning
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 