import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      email: 'john.doe@example.com',
      name: 'John Doe',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      preferences: {
        create: {
          theme: 'dark',
          language: 'en',
          notifications: true,
          emailNotifications: true,
          pushNotifications: false,
          accessibilityMode: false,
          fontSize: 'medium',
          learningStyle: ['VISUAL', 'KINESTHETIC'],
          preferredTime: 'MORNING',
          availableDays: ['monday', 'wednesday', 'friday'],
          studySessionDuration: 90,
          maxSessionsPerDay: 2,
          preferredStartTime: '08:00',
          preferredEndTime: '16:00',
          preferredCategories: ['Programming', 'Web Development'],
          preferredLevels: ['BEGINNER', 'INTERMEDIATE'],
          maxCourseLoad: 2,
        },
      },
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'jane.smith@example.com' },
    update: {},
    create: {
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      preferences: {
        create: {
          theme: 'light',
          language: 'en',
          notifications: true,
          emailNotifications: true,
          pushNotifications: true,
          accessibilityMode: true,
          fontSize: 'large',
          learningStyle: ['AUDITORY', 'READING_WRITING'],
          preferredTime: 'EVENING',
          availableDays: ['tuesday', 'thursday', 'saturday'],
          studySessionDuration: 60,
          maxSessionsPerDay: 3,
          preferredStartTime: '18:00',
          preferredEndTime: '22:00',
          preferredCategories: ['Data Science', 'Programming'],
          preferredLevels: ['INTERMEDIATE', 'ADVANCED'],
          maxCourseLoad: 3,
        },
      },
    },
  })

  // Create sample courses
  const course1 = await prisma.course.create({
    data: {
      title: 'Introduction to Web Development',
      description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      isPublished: true,
      isFree: true,
      duration: 480, // 8 hours
      level: 'BEGINNER',
      category: 'Programming',
      tags: ['web-development', 'html', 'css', 'javascript'],
    },
  })

  const course2 = await prisma.course.create({
    data: {
      title: 'Advanced React Patterns',
      description: 'Master advanced React concepts and patterns for building scalable applications.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
      isPublished: true,
      isFree: false,
      price: 99.99,
      duration: 600, // 10 hours
      level: 'ADVANCED',
      category: 'Programming',
      tags: ['react', 'javascript', 'frontend', 'patterns'],
    },
  })

  const course3 = await prisma.course.create({
    data: {
      title: 'Data Science Fundamentals',
      description: 'Introduction to data science, statistics, and machine learning concepts.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      isPublished: true,
      isFree: false,
      price: 149.99,
      duration: 720, // 12 hours
      level: 'INTERMEDIATE',
      category: 'Data Science',
      tags: ['data-science', 'python', 'statistics', 'machine-learning'],
    },
  })

  // Create sample resources
  const resource1 = await prisma.resource.create({
    data: {
      title: 'HTML Basics Tutorial',
      description: 'Complete guide to HTML fundamentals',
      type: 'VIDEO',
      url: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=150&fit=crop',
      isPublic: true,
      userId: user1.id,
    },
  })

  const resource2 = await prisma.resource.create({
    data: {
      title: 'CSS Grid Layout Guide',
      description: 'Comprehensive guide to CSS Grid',
      type: 'LINK',
      url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=150&fit=crop',
      isPublic: true,
      userId: user1.id,
    },
  })

  const resource3 = await prisma.resource.create({
    data: {
      title: 'JavaScript ES6 Features',
      description: 'Modern JavaScript features and syntax',
      type: 'DOCUMENT',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=200&h=150&fit=crop',
      isPublic: true,
      userId: user2.id,
    },
  })

  const resource4 = await prisma.resource.create({
    data: {
      title: 'React Hooks Tutorial',
      description: 'Learn React Hooks from scratch',
      type: 'VIDEO',
      url: 'https://www.youtube.com/watch?v=dpw9EHDh2bM',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=150&fit=crop',
      isPublic: true,
      userId: user2.id,
    },
  })

  // Link resources to courses
  await prisma.courseResource.createMany({
    data: [
      { courseId: course1.id, resourceId: resource1.id, order: 1, isRequired: true },
      { courseId: course1.id, resourceId: resource2.id, order: 2, isRequired: true },
      { courseId: course1.id, resourceId: resource3.id, order: 3, isRequired: false },
      { courseId: course2.id, resourceId: resource4.id, order: 1, isRequired: true },
    ],
  })

  // Create course enrollments
  await prisma.courseEnrollment.createMany({
    data: [
      {
        userId: user1.id,
        courseId: course1.id,
        progress: 75,
        isActive: true,
      },
      {
        userId: user1.id,
        courseId: course2.id,
        progress: 30,
        isActive: true,
      },
      {
        userId: user2.id,
        courseId: course1.id,
        progress: 100,
        completedAt: new Date(),
        isActive: true,
      },
      {
        userId: user2.id,
        courseId: course3.id,
        progress: 0,
        isActive: true,
      },
    ],
  })

  // Create sample assignments
  const assignment1 = await prisma.assignment.create({
    data: {
      title: 'Build a Personal Portfolio',
      description: 'Create a responsive personal portfolio website using HTML, CSS, and JavaScript.',
      courseId: course1.id,
      userId: user1.id,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      status: 'IN_PROGRESS',
    },
  })

  const assignment2 = await prisma.assignment.create({
    data: {
      title: 'React Component Library',
      description: 'Build a reusable component library using React and TypeScript.',
      courseId: course2.id,
      userId: user1.id,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      status: 'PENDING',
    },
  })

  const assignment3 = await prisma.assignment.create({
    data: {
      title: 'Data Analysis Project',
      description: 'Analyze a dataset and create visualizations using Python.',
      courseId: course3.id,
      userId: user2.id,
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      status: 'SUBMITTED',
      submittedAt: new Date(),
      grade: 85,
      feedback: 'Great work on the analysis! Consider adding more visualizations next time.',
    },
  })

  // Link resources to assignments
  await prisma.assignmentResource.createMany({
    data: [
      { assignmentId: assignment1.id, resourceId: resource1.id, order: 1 },
      { assignmentId: assignment1.id, resourceId: resource2.id, order: 2 },
      { assignmentId: assignment2.id, resourceId: resource4.id, order: 1 },
    ],
  })

  console.log('✅ Database seeded successfully!')
  console.log(`Created ${await prisma.user.count()} users`)
  console.log(`Created ${await prisma.course.count()} courses`)
  console.log(`Created ${await prisma.resource.count()} resources`)
  console.log(`Created ${await prisma.assignment.count()} assignments`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 