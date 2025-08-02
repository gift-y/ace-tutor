"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera } from "lucide-react"

interface ProfileSetupStepProps {
  nickname: string
  setNickname: (nickname: string) => void
  profileImage: string
  setProfileImage: (image: string) => void
}

export default function ProfileSetupStep({
  nickname,
  setNickname,
  profileImage,
  setProfileImage,
}: ProfileSetupStepProps) {
  // This is a placeholder for image upload logic.
  // In a real app, you'd handle file uploads to a storage service.
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(event.target.files[0])
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Set Up Your Profile</h2>
      <p className="text-center text-muted-foreground">Give yourself a nickname and add a profile picture.</p>

      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profileImage || "/placeholder.svg"} alt="Profile Picture" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Label
            htmlFor="profile-image-upload"
            className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
          >
            <Camera className="h-4 w-4" />
            <span className="sr-only">Upload profile image</span>
          </Label>
          <Input
            id="profile-image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div className="w-full max-w-sm space-y-2">
          <Label htmlFor="nickname">Nickname</Label>
          <Input
            id="nickname"
            placeholder="e.g., AceLearner"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
