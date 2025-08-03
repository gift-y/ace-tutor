"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import LearningPreferenceStep from "./learning-preference-step"
import LearningHoursStep from "./learning-hours-step"
import SchedulePreferencesStep from "./schedule-preferences-step"
import SelectCoursesStep from "./select-courses-step" // Ensure this is imported
import ConfirmationStep from "./confirmation-step"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

type LearningPreference = "auditory" | "visual" | "kinesthetic" | "reading/writing"
type LearningHours = "morning" | "evening" | "night" | "noon" | null
type SchedulePreference = { day: string; duration: string }

export default function OnboardingSteps() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [learningPreferences, setLearningPreferences] = useState<LearningPreference[]>([])
  const [learningHours, setLearningHours] = useState<LearningHours>(null)
  const [schedulePreferences, setSchedulePreferences] = useState<SchedulePreference[]>([])
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])

  const totalSteps = 5 // Corrected: Learning Preference (0), Learning Hours (1), Schedule (2), Courses (3), Confirmation (4)

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1))
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const isNextDisabled = () => {
    switch (currentStep) {
      case 0: // Learning Preference
        return learningPreferences.length === 0
      case 1: // Learning Hours
        return !learningHours
      case 2: // Schedule Preferences
        return schedulePreferences.length === 0 || schedulePreferences.some((pref) => !pref.day || !pref.duration)
      case 3: // Select Courses - This is the newly visible step
        return selectedCourses.length === 0
      case 4: // Confirmation - No next button, leads to dashboard
        return false
      default:
        return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <LearningPreferenceStep
            selectedPreferences={learningPreferences}
            onSelectPreference={setLearningPreferences}
          />
        )
      case 1:
        return <LearningHoursStep selectedHours={learningHours} onSelectHours={setLearningHours} />
      case 2:
        return (
          <SchedulePreferencesStep
            schedulePreferences={schedulePreferences}
            setSchedulePreferences={setSchedulePreferences}
          />
        )
      case 3: // This case now correctly renders the SelectCoursesStep
        return <SelectCoursesStep selectedCourses={selectedCourses} onSelectCourses={setSelectedCourses} />
      case 4: // This is now the Confirmation Step
        return (
          <ConfirmationStep
            preferences={{
              learningPreferences,
              learningHours,
              schedulePreferences,
              selectedCourses,
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
          <Button onClick={() => router.push('/dashboard')} className="ml-auto">
            Go to Dashboard
          </Button>
        )}
      </div>
    </div>
  )
}
