"use client"

import React, { useState, useRef, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Camera, 
  Upload, 
  X, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut,
  Crop,
  Check,
  AlertCircle,
  User
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ProfilePictureUploadProps {
  currentImage?: string
  onImageUpload: (file: File) => void
  onImageRemove: () => void
  className?: string
}

export default function ProfilePictureUpload({
  currentImage,
  onImageUpload,
  onImageRemove,
  className
}: ProfilePictureUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [showCrop, setShowCrop] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [])

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size must be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string)
      setShowCrop(true)
    }
    reader.readAsDataURL(file)
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const simulateUpload = (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          onImageUpload(file)
          setPreviewImage(null)
          setShowCrop(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleCropConfirm = () => {
    // In a real app, you would implement actual image cropping here
    // For now, we'll simulate the upload with the preview image
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      canvas.width = 200
      canvas.height = 200
      ctx?.drawImage(img, 0, 0, 200, 200)
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'profile-picture.jpg', { type: 'image/jpeg' })
          simulateUpload(file)
        }
      }, 'image/jpeg', 0.8)
    }
    
    img.src = previewImage!
  }

  const handleCropCancel = () => {
    setPreviewImage(null)
    setShowCrop(false)
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Current Profile Picture */}
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <Avatar className="h-32 w-32 mx-auto">
            <AvatarImage 
              src={previewImage || currentImage} 
              alt="Profile Picture" 
            />
            <AvatarFallback className="text-2xl">
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          
          {!showCrop && (
            <Button
              size="sm"
              variant="secondary"
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full p-0"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Camera className="h-4 w-4" />
            </Button>
          )}
        </div>

        {currentImage && !showCrop && (
          <Button
            variant="outline"
            size="sm"
            onClick={onImageRemove}
            className="text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4 mr-2" />
            Remove Picture
          </Button>
        )}
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Drag & Drop Area */}
      {!showCrop && !isUploading && (
        <Card 
          className={cn(
            "border-2 border-dashed transition-colors cursor-pointer",
            isDragOver 
              ? "border-primary bg-primary/5" 
              : "border-muted-foreground/25 hover:border-primary/50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <CardContent className="p-8 text-center">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Upload Profile Picture</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop an image here, or click to browse
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Supported formats: JPG, PNG, GIF</p>
              <p>Maximum file size: 5MB</p>
              <p>Recommended size: 400x400 pixels</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Crop Preview */}
      {showCrop && previewImage && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crop className="h-5 w-5" />
              Crop Profile Picture
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-square max-w-md mx-auto bg-muted rounded-lg overflow-hidden">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              {/* Crop overlay would go here in a real implementation */}
              <div className="absolute inset-0 border-2 border-primary border-dashed pointer-events-none" />
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <Button size="sm" variant="outline">
                <ZoomIn className="h-4 w-4 mr-2" />
                Zoom In
              </Button>
              <Button size="sm" variant="outline">
                <ZoomOut className="h-4 w-4 mr-2" />
                Zoom Out
              </Button>
              <Button size="sm" variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Rotate
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleCropConfirm} className="flex-1">
                <Check className="h-4 w-4 mr-2" />
                Apply Crop
              </Button>
              <Button onClick={handleCropCancel} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Upload Guidelines */}
      {!showCrop && !isUploading && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
              <div className="text-sm">
                <h4 className="font-medium mb-1">Profile Picture Guidelines</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Use a clear, high-quality image</li>
                  <li>• Square images work best (1:1 ratio)</li>
                  <li>• Keep file size under 5MB</li>
                  <li>• Supported formats: JPG, PNG, GIF</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 