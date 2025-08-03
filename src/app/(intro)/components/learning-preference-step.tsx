"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type LearningPreference = "auditory" | "visual" | "kinesthetic" | "reading/writing"

interface LearningPreferenceStepProps {
  selectedPreferences: LearningPreference[] // Changed to array
  onSelectPreference: (preferences: LearningPreference[]) => void // Changed to array
}

const preferences = [
  { id: "auditory", name: "Auditory", description: "Learn best by listening." },
  { id: "visual", name: "Visual", description: "Learn best by seeing." },
  { id: "kinesthetic", name: "Kinesthetic", description: "Learn best by doing." },
  { id: "reading/writing", name: "Reading/Writing", description: "Learn best by reading and writing." },
]

export default function LearningPreferenceStep({
  selectedPreferences,
  onSelectPreference,
}: LearningPreferenceStepProps) {
  const handleTogglePreference = (preferenceId: LearningPreference) => {
    if (selectedPreferences.includes(preferenceId)) {
      onSelectPreference(selectedPreferences.filter((id) => id !== preferenceId))
    } else {
      onSelectPreference([...selectedPreferences, preferenceId])
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Choose Your Learning Preference(s)</h2>
      <p className="text-center text-muted-foreground">Select one or more ways you learn best.</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {preferences.map((preference) => (
          <Card
            key={preference.id}
            className={cn(
              "relative cursor-pointer transition-all hover:shadow-md",
              selectedPreferences.includes(preference.id as LearningPreference) && "border-primary ring-2 ring-primary",
            )}
            onClick={() => handleTogglePreference(preference.id as LearningPreference)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {preference.name}
                {selectedPreferences.includes(preference.id as LearningPreference) && (
                  <CheckCircle className="h-5 w-5 text-primary" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{preference.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
