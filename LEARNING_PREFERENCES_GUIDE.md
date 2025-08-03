# Learning Preferences System Guide

This guide explains the comprehensive learning preferences system added to the Ace Tutor application, designed to provide personalized learning experiences for each user.

## Overview

The learning preferences system allows users to customize their learning experience based on their individual learning styles, schedule preferences, and course selection preferences. This enables the application to provide more targeted and effective learning recommendations.

## Learning Preferences Features

### 1. Learning Styles

Users can select multiple learning styles that best describe how they learn:

#### **Auditory Learners**

- Learn best by listening
- Prefer audio content, podcasts, lectures
- Benefit from discussions and verbal explanations
- Good at remembering spoken information

#### **Visual Learners**

- Learn best by seeing
- Prefer diagrams, charts, videos, images
- Benefit from visual aids and demonstrations
- Good at remembering visual information

#### **Kinesthetic Learners**

- Learn best by doing
- Prefer hands-on activities, experiments, practice
- Benefit from interactive exercises and real-world applications
- Good at learning through physical activity

#### **Reading/Writing Learners**

- Learn best by reading and writing
- Prefer text-based content, note-taking, writing exercises
- Benefit from written explanations and documentation
- Good at learning through reading and writing

### 2. Preferred Learning Time

Users can specify when they prefer to learn:

#### **Morning (Default)**

- Best for early risers
- High energy and focus levels
- Good for complex topics requiring concentration
- Ideal for intensive study sessions

#### **Noon**

- Ideal for midday sessions
- Good for collaborative learning
- Suitable for lunch break study sessions
- Moderate energy levels

#### **Evening**

- Perfect after a long day
- Good for review and practice
- Suitable for relaxed learning
- Lower energy but good for reflection

#### **Night**

- For night owls and quiet study
- Good for focused individual work
- Suitable for deep learning sessions
- Quiet environment conducive to concentration

### 3. Schedule Preferences

Users can customize their learning schedule:

#### **Available Days**

- Array of preferred days: `["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]`
- Allows flexible scheduling based on personal commitments
- Supports both weekday and weekend learning

#### **Study Session Duration**

- Duration in minutes (default: 60 minutes)
- Customizable based on attention span and availability
- Can range from short 30-minute sessions to longer 2-hour sessions

#### **Maximum Sessions Per Day**

- Maximum number of study sessions per day (default: 3)
- Prevents overloading and maintains learning quality
- Adjustable based on energy levels and time availability

#### **Preferred Time Windows**

- **Start Time**: Preferred start time in HH:MM format (default: "09:00")
- **End Time**: Preferred end time in HH:MM format (default: "17:00")
- Defines the optimal learning window for each day

### 4. Course Selection Preferences

Users can specify their course preferences:

#### **Preferred Categories**

- Array of preferred course categories: `["Programming", "Data Science", "Web Development", "Design", "Business", "Marketing"]`
- Helps filter and recommend relevant courses
- Supports multiple interests and career goals

#### **Preferred Levels**

- Array of preferred difficulty levels: `["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]`
- Ensures appropriate challenge level
- Supports progressive learning paths

#### **Maximum Course Load**

- Maximum number of courses to take simultaneously (default: 3)
- Prevents overwhelming the learner
- Maintains focus and completion rates

## Database Schema

### UserPreferences Model

```prisma
model UserPreferences {
  id                String @id @default(cuid())
  userId            String @unique

  // Basic Preferences
  theme             String @default("light")
  language          String @default("en")
  notifications     Boolean @default(true)
  emailNotifications Boolean @default(true)
  pushNotifications Boolean @default(false)
  accessibilityMode Boolean @default(false)
  fontSize          String @default("medium")

  // Learning Preferences
  learningStyle     LearningStyle[] @default([])
  preferredTime     PreferredTime @default(MORNING)

  // Schedule Preferences
  availableDays     String[] @default([])
  studySessionDuration Int @default(60)
  maxSessionsPerDay Int @default(3)
  preferredStartTime String @default("09:00")
  preferredEndTime   String @default("17:00")

  // Course Selection Preferences
  preferredCategories String[] @default([])
  preferredLevels   CourseLevel[] @default([])
  maxCourseLoad     Int @default(3)

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("user_preferences")
}
```

### Enums

```prisma
enum LearningStyle {
  AUDITORY
  VISUAL
  KINESTHETIC
  READING_WRITING
}

enum PreferredTime {
  MORNING
  NOON
  EVENING
  NIGHT
}
```

## API Usage

### Creating User Preferences

```typescript
const preferences = await fetch("/api/user-preferences", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userId: "user_id",
    theme: "dark",
    language: "en",
    learningStyle: ["VISUAL", "KINESTHETIC"],
    preferredTime: "MORNING",
    availableDays: ["monday", "wednesday", "friday"],
    studySessionDuration: 90,
    maxSessionsPerDay: 2,
    preferredStartTime: "08:00",
    preferredEndTime: "16:00",
    preferredCategories: ["Programming", "Web Development"],
    preferredLevels: ["BEGINNER", "INTERMEDIATE"],
    maxCourseLoad: 2,
  }),
});
```

### Updating Learning Preferences

```typescript
const updatedPreferences = await fetch("/api/user-preferences", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userId: "user_id",
    learningStyle: ["AUDITORY", "READING_WRITING"],
    preferredTime: "EVENING",
    availableDays: ["tuesday", "thursday", "saturday"],
    studySessionDuration: 60,
    maxSessionsPerDay: 3,
    preferredStartTime: "18:00",
    preferredEndTime: "22:00",
    preferredCategories: ["Data Science", "Programming"],
    preferredLevels: ["INTERMEDIATE", "ADVANCED"],
    maxCourseLoad: 3,
  }),
});
```

## Implementation Benefits

### 1. Personalized Learning Experience

- Content recommendations based on learning styles
- Schedule optimization based on preferred times
- Course filtering based on interests and skill levels

### 2. Improved Learning Outcomes

- Better engagement through preferred learning methods
- Optimal timing for maximum retention
- Appropriate challenge levels for skill development

### 3. Flexible Scheduling

- Accommodates different lifestyles and commitments
- Supports both intensive and casual learning patterns
- Adapts to changing availability and preferences

### 4. Data-Driven Insights

- Tracks learning preferences over time
- Provides analytics on learning effectiveness
- Enables continuous improvement of recommendations

## Sample Data

The seed file includes example users with different learning preferences:

### John Doe (Visual/Kinesthetic Learner)

```json
{
  "learningStyle": ["VISUAL", "KINESTHETIC"],
  "preferredTime": "MORNING",
  "availableDays": ["monday", "wednesday", "friday"],
  "studySessionDuration": 90,
  "maxSessionsPerDay": 2,
  "preferredStartTime": "08:00",
  "preferredEndTime": "16:00",
  "preferredCategories": ["Programming", "Web Development"],
  "preferredLevels": ["BEGINNER", "INTERMEDIATE"],
  "maxCourseLoad": 2
}
```

### Jane Smith (Auditory/Reading-Writing Learner)

```json
{
  "learningStyle": ["AUDITORY", "READING_WRITING"],
  "preferredTime": "EVENING",
  "availableDays": ["tuesday", "thursday", "saturday"],
  "studySessionDuration": 60,
  "maxSessionsPerDay": 3,
  "preferredStartTime": "18:00",
  "preferredEndTime": "22:00",
  "preferredCategories": ["Data Science", "Programming"],
  "preferredLevels": ["INTERMEDIATE", "ADVANCED"],
  "maxCourseLoad": 3
}
```

## Next Steps

1. **Frontend Implementation**: Create user preference forms and settings pages
2. **Recommendation Engine**: Build algorithms to suggest courses based on preferences
3. **Analytics Dashboard**: Track learning effectiveness and preference changes
4. **A/B Testing**: Test different recommendation strategies
5. **Machine Learning**: Implement ML models for better personalization

## Migration Notes

- Existing user preferences will use default values for new fields
- All new fields are optional with sensible defaults
- The system is backward compatible with existing data
- Users can update their preferences at any time

This learning preferences system provides a solid foundation for creating truly personalized learning experiences in the Ace Tutor application.
