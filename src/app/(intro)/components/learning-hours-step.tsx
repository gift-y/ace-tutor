"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type LearningHours = "morning" | "evening" | "night" | "noon" | null

interface LearningHoursStepProps {
  selectedHours: LearningHours
  onSelectHours: (hours: LearningHours) => void
}

const hoursOptions = [
  { id: "morning", name: "Morning", description: "Best for early risers." },
  { id: "noon", name: "Noon", description: "Ideal for midday sessions." },
  { id: "evening", name: "Evening", description: "Perfect after a long day." },
  { id: "night", name: "Night", description: "For night owls and quiet study." },
]

export default function LearningHoursStep({ selectedHours, onSelectHours }: LearningHoursStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">When Do You Prefer to Learn?</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {hoursOptions.map((hours) => (
          <Card
            key={hours.id}
            className={cn(
              "relative cursor-pointer transition-all hover:shadow-md",
              selectedHours === hours.id && "border-primary ring-2 ring-primary",
            )}
            onClick={() => onSelectHours(hours.id as LearningHours)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {hours.name}
                {selectedHours === hours.id && <CheckCircle className="h-5 w-5 text-primary" />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{hours.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
