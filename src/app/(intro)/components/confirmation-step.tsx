import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ConfirmationStepProps {
  preferences: {
    learningPreference: string | null
    learningHours: string | null
    schedulePreference: { day: string; duration: string } | null // Changed to single object
    selectedCourses: string[]
    nickname: string
    profileImage: string
  }
}

export default function ConfirmationStep({ preferences }: ConfirmationStepProps) {
  const { learningPreference, learningHours, schedulePreference, selectedCourses, nickname, profileImage } = preferences

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">You're All Set!</h2>
      <p className="text-center text-muted-foreground">
        Review your selections below. You can always change these later in your dashboard.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>Your AceTutor Profile & Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profileImage || "/placeholder.svg"} alt="Profile Picture" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">Nickname:</h3>
              <p className="text-muted-foreground">{nickname || "Not set"}</p>
            </div>
          </div>
          <div>
            <h3 className="font-medium">Learning Preference:</h3>
            <p className="text-muted-foreground capitalize">{learningPreference || "Not selected"}</p>
          </div>
          <div>
            <h3 className="font-medium">Preferred Learning Hours:</h3>
            <p className="text-muted-foreground capitalize">
              {learningHours
                ? `${learningHours} (e.g., ${learningHours === "morning" ? "9 AM - 12 PM" : learningHours === "noon" ? "12 PM - 3 PM" : learningHours === "evening" ? "5 PM - 8 PM" : "9 PM - 12 AM"})`
                : "Not selected"}
            </p>
          </div>
          <div>
            <h3 className="font-medium">Scheduled Preference:</h3>
            {schedulePreference ? (
              <p className="text-muted-foreground">
                {schedulePreference.day} for {schedulePreference.duration}
              </p>
            ) : (
              <p className="text-muted-foreground">No schedule preference set.</p>
            )}
          </div>
          <div>
            <h3 className="font-medium">Selected Courses:</h3>
            {selectedCourses.length > 0 ? (
              <p className="text-muted-foreground capitalize">{selectedCourses.join(", ")}</p>
            ) : (
              <p className="text-muted-foreground">No courses selected.</p>
            )}
          </div>
        </CardContent>
      </Card>
      <p className="text-center text-sm text-muted-foreground">
        Click "Go to Dashboard" to start your AceTutor journey!
      </p>
    </div>
  )
}
