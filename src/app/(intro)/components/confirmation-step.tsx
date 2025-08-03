import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ConfirmationStepProps {
  preferences: {
    learningPreferences: string[] // Changed to array
    learningHours: string | null
    schedulePreferences: { day: string; duration: string }[] // Changed to array
    selectedCourses: string[]
  }
}

export default function ConfirmationStep({ preferences }: ConfirmationStepProps) {
  const { learningPreferences, learningHours, schedulePreferences, selectedCourses } = preferences

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">You're All Set!</h2>
      <p className="text-center text-muted-foreground">
        Review your selections below. You can always change these later in your dashboard.
      </p>
      <Card className="p-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Your Personalized AceTutor Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Learning Preferences:</h3>
            {learningPreferences.length > 0 ? (
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {learningPreferences.map((pref, index) => (
                  <li key={index} className="capitalize">
                    {pref.replace("/", " / ")}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No preferences selected.</p>
            )}
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-2">Preferred Learning Hours:</h3>
            <p className="text-muted-foreground capitalize">
              {learningHours
                ? `${learningHours} (e.g., ${learningHours === "morning" ? "9 AM - 12 PM" : learningHours === "noon" ? "12 PM - 3 PM" : learningHours === "evening" ? "5 PM - 8 PM" : "9 PM - 12 AM"})`
                : "Not selected"}
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-2">Scheduled Preferences:</h3>
            {schedulePreferences.length > 0 ? (
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {schedulePreferences.map((pref, index) => (
                  <li key={index}>
                    {pref.day} for {pref.duration}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No schedule preferences set.</p>
            )}
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-2">Selected Courses:</h3>
            {selectedCourses.length > 0 ? (
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {selectedCourses.map((course, index) => (
                  <li key={index} className="capitalize">
                    {course}
                  </li>
                ))}
              </ul>
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
