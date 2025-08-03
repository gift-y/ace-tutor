import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/course-enrollments - Get enrollments with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const courseId = searchParams.get('courseId')
    const isActive = searchParams.get('isActive')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}

    if (userId) {
      where.userId = userId
    }

    if (courseId) {
      where.courseId = courseId
    }

    if (isActive !== null) {
      where.isActive = isActive === 'true'
    }

    const [enrollments, total] = await Promise.all([
      prisma.courseEnrollment.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
          course: {
            include: {
              resources: {
                include: {
                  resource: {
                    select: {
                      id: true,
                      title: true,
                      type: true,
                    },
                  },
                },
              },
              assignments: {
                where: userId ? { userId } : undefined,
                select: {
                  id: true,
                  title: true,
                  status: true,
                  dueDate: true,
                },
              },
            },
          },
        },
        skip,
        take: limit,
        orderBy: { enrolledAt: 'desc' },
      }),
      prisma.courseEnrollment.count({ where }),
    ])

    return NextResponse.json({
      enrollments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching enrollments:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/course-enrollments - Enroll user in a course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, courseId } = body

    if (!userId || !courseId) {
      return NextResponse.json(
        { error: 'User ID and Course ID are required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    })

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.courseEnrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    })

    if (existingEnrollment) {
      if (existingEnrollment.isActive) {
        return NextResponse.json(
          { error: 'User is already enrolled in this course' },
          { status: 409 }
        )
      } else {
        // Reactivate enrollment
        const enrollment = await prisma.courseEnrollment.update({
          where: { id: existingEnrollment.id },
          data: { isActive: true },
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
            course: {
              include: {
                resources: {
                  include: {
                    resource: {
                      select: {
                        id: true,
                        title: true,
                        type: true,
                      },
                    },
                  },
                },
                assignments: {
                  where: { userId },
                  select: {
                    id: true,
                    title: true,
                    status: true,
                    dueDate: true,
                  },
                },
              },
            },
          },
        })

        return NextResponse.json(enrollment, { status: 200 })
      }
    }

    // Create new enrollment
    const enrollment = await prisma.courseEnrollment.create({
      data: {
        userId,
        courseId,
        progress: 0,
        isActive: true,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        course: {
          include: {
            resources: {
              include: {
                resource: {
                  select: {
                    id: true,
                    title: true,
                    type: true,
                  },
                },
              },
            },
            assignments: {
              where: { userId },
              select: {
                id: true,
                title: true,
                status: true,
                dueDate: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(enrollment, { status: 201 })
  } catch (error) {
    console.error('Error creating enrollment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/course-enrollments - Update enrollment (progress, completion)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, progress, completedAt, isActive } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Enrollment ID is required' },
        { status: 400 }
      )
    }

    const enrollment = await prisma.courseEnrollment.update({
      where: { id },
      data: {
        ...(progress !== undefined && { progress }),
        ...(completedAt !== undefined && { completedAt }),
        ...(typeof isActive === 'boolean' && { isActive }),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        course: {
          include: {
            resources: {
              include: {
                resource: {
                  select: {
                    id: true,
                    title: true,
                    type: true,
                  },
                },
              },
            },
            assignments: {
              select: {
                id: true,
                title: true,
                status: true,
                dueDate: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(enrollment)
  } catch (error) {
    console.error('Error updating enrollment:', error)
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/course-enrollments - Delete enrollment (soft delete)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Enrollment ID is required' },
        { status: 400 }
      )
    }

    // Soft delete by setting isActive to false
    await prisma.courseEnrollment.update({
      where: { id },
      data: { isActive: false },
    })

    return NextResponse.json(
      { message: 'Enrollment deactivated successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deactivating enrollment:', error)
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 