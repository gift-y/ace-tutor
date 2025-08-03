# Database Setup Guide

This project uses Prisma with PostgreSQL for the database. Here's how to set it up:

## Prerequisites

1. **PostgreSQL**: Make sure you have PostgreSQL installed and running
2. **Node.js**: Version 18 or higher
3. **npm**: For package management

## Database Models

The database includes the following models:

### 1. User

- Basic user information (email, name, image)
- One-to-one relationship with UserPreferences
- One-to-many relationships with Courses, Assignments, and Resources

### 2. UserPreferences

- Theme settings (light, dark, system)
- Language preferences
- Notification settings
- Accessibility options
- Font size preferences
- **Learning Preferences:**
  - Learning styles (Auditory, Visual, Kinesthetic, Reading/Writing)
  - Preferred learning time (Morning, Noon, Evening, Night)
- **Schedule Preferences:**
  - Available days for learning
  - Study session duration (in minutes)
  - Maximum sessions per day
  - Preferred start and end times
- **Course Selection Preferences:**
  - Preferred course categories
  - Preferred difficulty levels
  - Maximum course load

### 3. Resource

- Supports multiple types: IMAGE, VIDEO, LINK, DOCUMENT, AUDIO, OTHER
- File metadata (size, MIME type, thumbnail)
- Public/private visibility settings
- Relationships with Courses and Assignments

### 4. Course

- Course information (title, description, image)
- Pricing and publication status
- Duration and difficulty level
- Categories and tags
- Relationships with enrollments, resources, and assignments

### 5. CourseEnrollment

- Tracks user enrollment in courses
- Progress tracking (0-100%)
- Completion status
- Active/inactive status

### 6. Assignment

- Assignment details and requirements
- Due dates and status tracking
- Grading and feedback
- Relationships with courses and resources

## Setup Instructions

### 1. Environment Configuration

Make sure your `.env` file contains the database URL:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/ace_tutor?schema=public"
```

Replace `username`, `password`, and `ace_tutor` with your actual PostgreSQL credentials and database name.

### 2. Database Setup

Create the database in PostgreSQL:

```sql
CREATE DATABASE ace_tutor;
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Generate Prisma Client

```bash
npm run db:generate
```

### 5. Push Schema to Database

```bash
npm run db:push
```

### 6. Seed the Database

```bash
npm run db:seed
```

## Available Scripts

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and apply migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio for database management

## Database Relationships

### User Relationships

- **User → UserPreferences**: One-to-one
- **User → CourseEnrollment**: One-to-many
- **User → Assignment**: One-to-many
- **User → Resource**: One-to-many

### Course Relationships

- **Course → CourseEnrollment**: One-to-many
- **Course → CourseResource**: One-to-many
- **Course → Assignment**: One-to-many

### Resource Relationships

- **Resource → CourseResource**: One-to-many
- **Resource → AssignmentResource**: One-to-many

### Assignment Relationships

- **Assignment → AssignmentResource**: One-to-many

## Sample Data

The seed script creates:

- **2 Users**: John Doe and Jane Smith with different preferences
- **3 Courses**: Web Development, React Patterns, and Data Science
- **4 Resources**: Various types (video, link, document)
- **3 Assignments**: Different statuses and due dates
- **4 Course Enrollments**: Various progress levels
- **Multiple Relationships**: Resources linked to courses and assignments

## Using Prisma in Your Code

Import the Prisma client:

```typescript
import { prisma } from "@/lib/prisma";

// Example: Get all users with their preferences
const users = await prisma.user.findMany({
  include: {
    preferences: true,
    courses: {
      include: {
        course: true,
      },
    },
  },
});
```

## Database Schema Features

- **Cascade Deletes**: When a user is deleted, all related data is automatically removed
- **Unique Constraints**: Prevents duplicate enrollments and resource assignments
- **Enums**: Type-safe enums for resource types, course levels, and assignment statuses
- **Timestamps**: Automatic createdAt and updatedAt fields
- **Soft Deletes**: Consider using isActive flags for soft deletion

## Troubleshooting

### Common Issues

1. **Connection Error**: Check your DATABASE_URL and ensure PostgreSQL is running
2. **Permission Error**: Make sure your database user has the necessary permissions
3. **Schema Sync Error**: Run `npm run db:push` to sync schema changes

### Reset Database

To completely reset the database:

```bash
# Drop and recreate the database
npx prisma migrate reset

# Or manually:
npx prisma db push --force-reset
npm run db:seed
```

## Next Steps

1. Set up your PostgreSQL database
2. Update the DATABASE_URL in your `.env` file
3. Run the setup commands above
4. Start building your application with the database models!
