"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface SelectCoursesStepProps {
  selectedCourses: string[]
  onSelectCourses: (courses: string[]) => void
}

const availableCourses = [
  { id: "math", name: "Mathematics", description: "Algebra, Geometry, Calculus, etc." },
  { id: "science", name: "Science", description: "Physics, Chemistry, Biology." },
  { id: "history", name: "History", description: "World History, US History, Ancient Civilizations." },
  { id: "literature", name: "Literature", description: "English, World Literature, Creative Writing." },
  { id: "programming", name: "Programming", description: "Python, JavaScript, Web Development." },
  { id: "art", name: "Art & Design", description: "Drawing, Painting, Digital Art." },
  { id: "business", name: "Business", description: "Economics, Marketing, Management." },
  { id: "engineering", name: "Engineering", description: "Civil, Mechanical, Electrical, Software." },
]

export default function SelectCoursesStep({ selectedCourses, onSelectCourses }: SelectCoursesStepProps) {
  const handleCheckboxChange = (courseId: string, checked: boolean) => {
    if (checked) {
      onSelectCourses([...selectedCourses, courseId])
    } else {
      onSelectCourses(selectedCourses.filter((id) => id !== courseId))
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Select Your Courses</h2>
      <p className="text-center text-muted-foreground">Choose the subjects you'd like to learn with AceTutor.</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {availableCourses.map((course) => (
          <Card
            key={course.id}
            className={cn(
              "relative transition-all hover:shadow-md",
              selectedCourses.includes(course.id) && "border-primary ring-2 ring-primary",
            )}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <Label htmlFor={`course-${course.id}`} className="flex-1 cursor-pointer">
                  {course.name}
                </Label>
                <Checkbox
                  id={`course-${course.id}`}
                  checked={selectedCourses.includes(course.id)}
                  onCheckedChange={(checked) => handleCheckboxChange(course.id, checked as boolean)}
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{course.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
