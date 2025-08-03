"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X } from "lucide-react"

type SchedulePreference = { day: string; duration: string }

interface SchedulePreferencesStepProps {
  schedulePreferences: SchedulePreference[]
  setSchedulePreferences: (preferences: SchedulePreference[]) => void
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const sessionDurations = ["30 mins", "45 mins", "1 hr", "2 hrs +"]

export default function SchedulePreferencesStep({
  schedulePreferences,
  setSchedulePreferences,
}: SchedulePreferencesStepProps) {
  const [newDay, setNewDay] = useState<string>("")
  const [newDuration, setNewDuration] = useState<string>("")

  const handleAddPreference = () => {
    if (newDay && newDuration && !schedulePreferences.some((pref) => pref.day === newDay)) {
      setSchedulePreferences([...schedulePreferences, { day: newDay, duration: newDuration }])
      setNewDay("")
      setNewDuration("")
    }
  }

  const handleRemovePreference = (index: number) => {
    setSchedulePreferences(schedulePreferences.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Schedule Preferences</h2>
      <p className="text-center text-muted-foreground">
        When are you available to learn? Add your preferred days and study session durations.
      </p>

      <div className="space-y-4">
        {schedulePreferences.map((pref, index) => (
          <div key={index} className="flex items-center gap-2 rounded-md border p-3">
            <div className="flex-1">
              <p className="font-medium">{pref.day}</p>
              <p className="text-sm text-muted-foreground">{pref.duration}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => handleRemovePreference(index)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <Label htmlFor="day-select">Day</Label>
          <Select value={newDay} onValueChange={setNewDay}>
            <SelectTrigger id="day-select">
              <SelectValue placeholder="Select a day" />
            </SelectTrigger>
            <SelectContent>
              {daysOfWeek.map((day) => (
                <SelectItem key={day} value={day} disabled={schedulePreferences.some((pref) => pref.day === day)}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-1">
          <Label htmlFor="duration-select">Study Session Duration</Label>
          <Select value={newDuration} onValueChange={setNewDuration}>
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
        <div className="flex items-end sm:col-span-1">
          <Button onClick={handleAddPreference} disabled={!newDay || !newDuration} className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
      </div>
    </div>
  )
}
