"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import LearningPreferenceStep from "./learning-preference-step"
import LearningHoursStep from "./learning-hours-step"
import SchedulePreferencesStep from "./schedule-preferences-step"
import SelectCoursesStep from "./select-courses-step"
import ProfileSetupStep from "./profile-setup-step"
import ConfirmationStep from "./confirmation-step"
import { Progress } from "@/components/ui/progress"

type LearningPreference = "auditory" | "visual" | "kinesthetic" | "reading/writing" | null
type LearningHours = "morning" | "evening" | "night" | "noon" | null
type SchedulePreference = { day: string; duration: string } // Changed 'time' to 'duration'

export default function OnboardingSteps() {
  const [currentStep, setCurrentStep] = useState(0)
  const [learningPreference, setLearningPreference] = useState<LearningPreference>(null)
  const [learningHours, setLearningHours] = useState<LearningHours>(null)
  const [schedulePreference, setSchedulePreference] = useState<SchedulePreference | null>(null) // Changed to single object
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [nickname, setNickname] = useState<string>("")
  const [profileImage, setProfileImage] = useState<string>("/placeholder.svg?height=100&width=100")

  const totalSteps = 6 // Learning Preference, Learning Hours, Schedule, Courses, Profile, Confirmation

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1))
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const isNextDisabled = () => {
    switch (currentStep) {
      case 0: // Learning Preference
        return !learningPreference
      case 1: // Learning Hours
        return !learningHours
      case 2: // Schedule Preferences
        // Check if a day AND a duration are selected
        return !schedulePreference?.day || !schedulePreference?.duration
      case 3: // Select Courses
        return selectedCourses.length === 0
      case 4: // Profile Setup
        return !nickname
      default:
        return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <LearningPreferenceStep selectedPreference={learningPreference} onSelectPreference={setLearningPreference} />
        )
      case 1:
        return <LearningHoursStep selectedHours={learningHours} onSelectHours={setLearningHours} />
      case 2:
        return (
          <SchedulePreferencesStep
            selectedDay={schedulePreference?.day || null}
            onSelectDay={(day) => setSchedulePreference((prev) => ({ ...prev, day, duration: prev?.duration || "" }))}
            selectedDuration={schedulePreference?.duration || null}
            onSelectDuration={(duration) =>
              setSchedulePreference((prev) => ({ ...prev, duration, day: prev?.day || "" }))
            }
          />
        )
      case 3:
        return <SelectCoursesStep selectedCourses={selectedCourses} onSelectCourses={setSelectedCourses} />
      case 4:
        return (
          <ProfileSetupStep
            nickname={nickname}
            setNickname={setNickname}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
          />
        )
      case 5:
        return (
          <ConfirmationStep
            preferences={{
              learningPreference,
              learningHours,
              schedulePreference, // Pass single object
              selectedCourses,
              nickname,
              profileImage,
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <Progress value={(currentStep / (totalSteps - 1)) * 100} className="h-2" />
      <div>{renderStep()}</div>
      <div className="flex justify-between">
        {currentStep > 0 && (
          <Button variant="outline" onClick={handlePrevious}>
            Previous
          </Button>
        )}
        {currentStep < totalSteps - 1 && (
          <Button onClick={handleNext} disabled={isNextDisabled()} className="ml-auto">
            Next
          </Button>
        )}
        {currentStep === totalSteps - 1 && (
          <Button asChild className="ml-auto">
            <a href="/dashboard">Go to Dashboard</a>
          </Button>
        )}
      </div>
    </div>
  )
}
