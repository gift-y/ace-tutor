# API Documentation

This document provides comprehensive documentation for all CRUD API endpoints in the Ace Tutor application.

## Base URL

```
http://localhost:3000/api
```

## Authentication

The application uses Kinde for authentication. All API endpoints that require authentication should include the user's ID in the request body or query parameters.

## API Endpoints

### 1. User Management

#### GET /api/users

Get all users with filtering and pagination.

**Query Parameters:**

- `email` (optional): Filter by email
- `search` (optional): Search in name and email
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**

```json
{
  "users": [
    {
      "id": "user_id",
      "email": "user@example.com",
      "name": "John Doe",
      "image": "https://example.com/image.jpg",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z",
      "preferences": {
        "theme": "dark",
        "language": "en",
        "notifications": true
      },
      "_count": {
        "courses": 5,
        "assignments": 10,
        "resources": 3
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

#### POST /api/users

Create a new user (for Kinde integration).

**Request Body:**

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "image": "https://example.com/image.jpg"
}
```

#### PUT /api/users

Update user profile.

**Request Body:**

```json
{
  "id": "user_id",
  "name": "John Doe Updated",
  "image": "https://example.com/new-image.jpg"
}
```

#### DELETE /api/users?id=user_id

Delete user and all related data.

---

### 2. User Preferences

#### GET /api/user-preferences?userId=user_id

Get user preferences by user ID.

**Response:**

```json
{
  "id": "pref_id",
  "userId": "user_id",
  "theme": "dark",
  "language": "en",
  "notifications": true,
  "emailNotifications": true,
  "pushNotifications": false,
  "accessibilityMode": false,
  "fontSize": "medium",
  "learningStyle": ["VISUAL", "KINESTHETIC"],
  "preferredTime": "MORNING",
  "availableDays": ["monday", "wednesday", "friday"],
  "studySessionDuration": 90,
  "maxSessionsPerDay": 2,
  "preferredStartTime": "08:00",
  "preferredEndTime": "16:00",
  "preferredCategories": ["Programming", "Web Development"],
  "preferredLevels": ["BEGINNER", "INTERMEDIATE"],
  "maxCourseLoad": 2,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### POST /api/user-preferences

Create new user preferences.

**Request Body:**

```json
{
  "userId": "user_id",
  "theme": "dark",
  "language": "en",
  "notifications": true,
  "emailNotifications": true,
  "pushNotifications": false,
  "accessibilityMode": false,
  "fontSize": "medium",
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

**Learning Style Options:**

- `AUDITORY` - Learn best by listening
- `VISUAL` - Learn best by seeing
- `KINESTHETIC` - Learn best by doing
- `READING_WRITING` - Learn best by reading and writing

**Preferred Time Options:**

- `MORNING` - Best for early risers
- `NOON` - Ideal for midday sessions
- `EVENING` - Perfect after a long day
- `NIGHT` - For night owls and quiet study

#### PUT /api/user-preferences

Update user preferences.

**Request Body:**

```json
{
  "userId": "user_id",
  "theme": "light",
  "language": "es",
  "notifications": false,
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

#### DELETE /api/user-preferences?userId=user_id

Delete user preferences.

---

### 3. Resources

#### GET /api/resources

Get all resources with filtering and pagination.

**Query Parameters:**

- `userId` (optional): Filter by user ID
- `type` (optional): Filter by resource type (IMAGE, VIDEO, LINK, DOCUMENT, AUDIO, OTHER)
- `isPublic` (optional): Filter by public status (true/false)
- `search` (optional): Search in title and description
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**

```json
{
  "resources": [
    {
      "id": "resource_id",
      "title": "HTML Tutorial",
      "description": "Learn HTML basics",
      "type": "VIDEO",
      "url": "https://youtube.com/watch?v=...",
      "filePath": null,
      "fileSize": null,
      "mimeType": null,
      "thumbnail": "https://example.com/thumbnail.jpg",
      "isPublic": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z",
      "user": {
        "id": "user_id",
        "email": "user@example.com",
        "name": "John Doe"
      },
      "courses": [
        {
          "course": {
            "id": "course_id",
            "title": "Web Development"
          }
        }
      ],
      "assignments": [
        {
          "assignment": {
            "id": "assignment_id",
            "title": "Build Portfolio"
          }
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

#### POST /api/resources

Create new resource.

**Request Body:**

```json
{
  "title": "CSS Grid Tutorial",
  "description": "Learn CSS Grid layout",
  "type": "LINK",
  "url": "https://css-tricks.com/grid/",
  "filePath": null,
  "fileSize": null,
  "mimeType": null,
  "thumbnail": "https://example.com/thumbnail.jpg",
  "isPublic": true,
  "userId": "user_id"
}
```

#### PUT /api/resources

Update resource.

**Request Body:**

```json
{
  "id": "resource_id",
  "title": "Updated CSS Grid Tutorial",
  "description": "Updated description",
  "isPublic": false
}
```

#### DELETE /api/resources?id=resource_id

Delete resource.

---

### 4. Courses

#### GET /api/courses

Get all courses or user's enrolled courses.

**Query Parameters:**

- `userId` (optional): Get user's enrolled courses
- `isPublished` (optional): Filter by publication status (true/false)
- `level` (optional): Filter by level (BEGINNER, INTERMEDIATE, ADVANCED, EXPERT)
- `category` (optional): Filter by category
- `isFree` (optional): Filter by free status (true/false)
- `search` (optional): Search in title, description, and category
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response (All Courses):**

```json
{
  "courses": [
    {
      "id": "course_id",
      "title": "Web Development Fundamentals",
      "description": "Learn web development basics",
      "image": "https://example.com/course-image.jpg",
      "isPublished": true,
      "isFree": true,
      "price": null,
      "duration": 480,
      "level": "BEGINNER",
      "category": "Programming",
      "tags": ["web-development", "html", "css"],
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z",
      "enrollments": [
        {
          "id": "enrollment_id",
          "progress": 75,
          "isActive": true
        }
      ],
      "resources": [
        {
          "resource": {
            "id": "resource_id",
            "title": "HTML Tutorial",
            "type": "VIDEO"
          }
        }
      ],
      "assignments": [
        {
          "id": "assignment_id",
          "title": "Build Portfolio"
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "pages": 2
  }
}
```

**Response (User's Enrolled Courses):**

```json
{
  "enrollments": [
    {
      "id": "enrollment_id",
      "userId": "user_id",
      "courseId": "course_id",
      "enrolledAt": "2024-01-01T00:00:00Z",
      "completedAt": null,
      "progress": 75,
      "isActive": true,
      "course": {
        "id": "course_id",
        "title": "Web Development Fundamentals",
        "description": "Learn web development basics",
        "image": "https://example.com/course-image.jpg",
        "isPublished": true,
        "isFree": true,
        "price": null,
        "duration": 480,
        "level": "BEGINNER",
        "category": "Programming",
        "tags": ["web-development", "html", "css"],
        "resources": [
          {
            "resource": {
              "id": "resource_id",
              "title": "HTML Tutorial",
              "type": "VIDEO"
            }
          }
        ],
        "assignments": [
          {
            "id": "assignment_id",
            "title": "Build Portfolio",
            "status": "IN_PROGRESS",
            "dueDate": "2024-01-15T00:00:00Z"
          }
        ]
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "pages": 1
  }
}
```

#### POST /api/courses

Create new course.

**Request Body:**

```json
{
  "title": "Advanced React Patterns",
  "description": "Master advanced React concepts",
  "image": "https://example.com/course-image.jpg",
  "isPublished": false,
  "isFree": false,
  "price": 99.99,
  "duration": 600,
  "level": "ADVANCED",
  "category": "Programming",
  "tags": ["react", "javascript", "patterns"]
}
```

#### PUT /api/courses

Update course.

**Request Body:**

```json
{
  "id": "course_id",
  "title": "Updated Course Title",
  "description": "Updated description",
  "isPublished": true,
  "price": 89.99
}
```

#### DELETE /api/courses?id=course_id

Delete course.

---

### 5. Course Enrollments

#### GET /api/course-enrollments

Get course enrollments with filtering.

**Query Parameters:**

- `userId` (optional): Filter by user ID
- `courseId` (optional): Filter by course ID
- `isActive` (optional): Filter by active status (true/false)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**

```json
{
  "enrollments": [
    {
      "id": "enrollment_id",
      "userId": "user_id",
      "courseId": "course_id",
      "enrolledAt": "2024-01-01T00:00:00Z",
      "completedAt": null,
      "progress": 75,
      "isActive": true,
      "user": {
        "id": "user_id",
        "email": "user@example.com",
        "name": "John Doe"
      },
      "course": {
        "id": "course_id",
        "title": "Web Development Fundamentals",
        "description": "Learn web development basics",
        "image": "https://example.com/course-image.jpg",
        "isPublished": true,
        "isFree": true,
        "price": null,
        "duration": 480,
        "level": "BEGINNER",
        "category": "Programming",
        "tags": ["web-development", "html", "css"],
        "resources": [
          {
            "resource": {
              "id": "resource_id",
              "title": "HTML Tutorial",
              "type": "VIDEO"
            }
          }
        ],
        "assignments": [
          {
            "id": "assignment_id",
            "title": "Build Portfolio",
            "status": "IN_PROGRESS",
            "dueDate": "2024-01-15T00:00:00Z"
          }
        ]
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 20,
    "pages": 2
  }
}
```

#### POST /api/course-enrollments

Enroll user in a course.

**Request Body:**

```json
{
  "userId": "user_id",
  "courseId": "course_id"
}
```

#### PUT /api/course-enrollments

Update enrollment (progress, completion).

**Request Body:**

```json
{
  "id": "enrollment_id",
  "progress": 85,
  "completedAt": "2024-01-15T00:00:00Z",
  "isActive": true
}
```

#### DELETE /api/course-enrollments?id=enrollment_id

Deactivate enrollment (soft delete).

---

### 6. Assignments

#### GET /api/assignments

Get assignments with filtering and pagination.

**Query Parameters:**

- `userId` (optional): Filter by user ID
- `courseId` (optional): Filter by course ID
- `status` (optional): Filter by status (PENDING, IN_PROGRESS, SUBMITTED, GRADED, OVERDUE)
- `search` (optional): Search in title and description
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**

```json
{
  "assignments": [
    {
      "id": "assignment_id",
      "title": "Build a Portfolio Website",
      "description": "Create a responsive portfolio using HTML, CSS, and JavaScript",
      "courseId": "course_id",
      "userId": "user_id",
      "dueDate": "2024-01-15T00:00:00Z",
      "status": "IN_PROGRESS",
      "grade": null,
      "feedback": null,
      "submittedAt": null,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z",
      "user": {
        "id": "user_id",
        "email": "user@example.com",
        "name": "John Doe"
      },
      "course": {
        "id": "course_id",
        "title": "Web Development Fundamentals",
        "level": "BEGINNER"
      },
      "resources": [
        {
          "resource": {
            "id": "resource_id",
            "title": "HTML Tutorial",
            "type": "VIDEO",
            "url": "https://youtube.com/watch?v=...",
            "thumbnail": "https://example.com/thumbnail.jpg"
          }
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 30,
    "pages": 3
  }
}
```

#### POST /api/assignments

Create new assignment.

**Request Body:**

```json
{
  "title": "Build a Portfolio Website",
  "description": "Create a responsive portfolio using HTML, CSS, and JavaScript",
  "courseId": "course_id",
  "userId": "user_id",
  "dueDate": "2024-01-15T00:00:00Z",
  "status": "PENDING",
  "resourceIds": ["resource_id_1", "resource_id_2"]
}
```

#### PUT /api/assignments

Update assignment.

**Request Body:**

```json
{
  "id": "assignment_id",
  "title": "Updated Assignment Title",
  "description": "Updated description",
  "status": "SUBMITTED",
  "submittedAt": "2024-01-10T00:00:00Z",
  "grade": 85,
  "feedback": "Great work! Consider adding more animations.",
  "resourceIds": ["resource_id_1", "resource_id_3"]
}
```

#### DELETE /api/assignments?id=assignment_id

Delete assignment.

---

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error message description"
}
```

**Common HTTP Status Codes:**

- `200` - Success
- `201` - Created
- `400` - Bad Request (missing required fields)
- `404` - Not Found
- `409` - Conflict (duplicate entry)
- `500` - Internal Server Error

## Usage Examples

### JavaScript/TypeScript

```typescript
// Get user's enrolled courses
const response = await fetch("/api/courses?userId=user_id");
const data = await response.json();

// Create a new resource
const resource = await fetch("/api/resources", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "React Tutorial",
    description: "Learn React basics",
    type: "VIDEO",
    url: "https://youtube.com/watch?v=...",
    isPublic: true,
    userId: "user_id",
  }),
});

// Update user preferences
const preferences = await fetch("/api/user-preferences", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userId: "user_id",
    theme: "dark",
    language: "en",
    notifications: true,
  }),
});
```

### cURL

```bash
# Get all published courses
curl "http://localhost:3000/api/courses?isPublished=true"

# Create a new assignment
curl -X POST "http://localhost:3000/api/assignments" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Build Portfolio",
    "description": "Create a responsive portfolio",
    "courseId": "course_id",
    "userId": "user_id",
    "dueDate": "2024-01-15T00:00:00Z"
  }'

# Update course enrollment progress
curl -X PUT "http://localhost:3000/api/course-enrollments" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "enrollment_id",
    "progress": 85
  }'
```

## Notes

1. **Authentication**: All endpoints require proper user identification through the `userId` parameter.
2. **Pagination**: All list endpoints support pagination with `page` and `limit` parameters.
3. **Filtering**: Most endpoints support various filtering options through query parameters.
4. **Relationships**: Responses include related data where appropriate (e.g., course resources, user preferences).
5. **Soft Deletes**: Course enrollments use soft deletes (setting `isActive` to false).
6. **Cascade Deletes**: User deletion cascades to all related data (preferences, enrollments, assignments, resources).
