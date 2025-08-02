"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SchedulePreferencesStepProps {
  selectedDay: string | null
  onSelectDay: (day: string) => void
  selectedDuration: string | null
  onSelectDuration: (duration: string) => void
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const sessionDurations = ["30 mins", "45 mins", "1 hr", "2 hrs +"]

export default function SchedulePreferencesStep({
  selectedDay,
  onSelectDay,
  selectedDuration,
  onSelectDuration,
}: SchedulePreferencesStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Schedule Preferences</h2>
      <p className="text-center text-muted-foreground">
        When are you available to learn? Set your preferred day and study session duration.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="day-select">Preferred Day</Label>
          <Select value={selectedDay || ""} onValueChange={onSelectDay}>
            <SelectTrigger id="day-select">
              <SelectValue placeholder="Select a day" />
            </SelectTrigger>
            <SelectContent>
              {daysOfWeek.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="duration-select">Study Session Duration</Label>
          <Select value={selectedDuration || ""} onValueChange={onSelectDuration}>
            <SelectTrigger id="duration-select">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {sessionDurations.map((duration) => (
                <SelectItem key={duration} value={duration}>
                  {duration}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
