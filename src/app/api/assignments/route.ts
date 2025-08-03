import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/assignments - Get assignments with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const courseId = searchParams.get('courseId')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}

    if (userId) {
      where.userId = userId
    }

    if (courseId) {
      where.courseId = courseId
    }

    if (status) {
      where.status = status
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [assignments, total] = await Promise.all([
      prisma.assignment.findMany({
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
            select: {
              id: true,
              title: true,
              level: true,
            },
          },
          resources: {
            include: {
              resource: {
                select: {
                  id: true,
                  title: true,
                  type: true,
                  url: true,
                  thumbnail: true,
                },
              },
            },
            orderBy: { order: 'asc' },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.assignment.count({ where }),
    ])

    return NextResponse.json({
      assignments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching assignments:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/assignments - Create new assignment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      courseId,
      userId,
      dueDate,
      status = 'PENDING',
      resourceIds = [], // Array of resource IDs to link
    } = body

    if (!title || !courseId || !userId) {
      return NextResponse.json(
        { error: 'Title, courseId, and userId are required' },
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

    // Create assignment with resources
    const assignment = await prisma.assignment.create({
      data: {
        title,
        description,
        courseId,
        userId,
        dueDate: dueDate ? new Date(dueDate) : null,
        status,
        resources: {
          create: resourceIds.map((resourceId: string, index: number) => ({
            resourceId,
            order: index + 1,
          })),
        },
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
          select: {
            id: true,
            title: true,
            level: true,
          },
        },
        resources: {
          include: {
            resource: {
              select: {
                id: true,
                title: true,
                type: true,
                url: true,
                thumbnail: true,
              },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
    })

    return NextResponse.json(assignment, { status: 201 })
  } catch (error) {
    console.error('Error creating assignment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/assignments - Update assignment
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      id,
      title,
      description,
      dueDate,
      status,
      grade,
      feedback,
      submittedAt,
      resourceIds, // Array of resource IDs to replace existing ones
    } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Assignment ID is required' },
        { status: 400 }
      )
    }

    // Start a transaction to update assignment and resources
    const assignment = await prisma.$transaction(async (tx) => {
      // Update assignment
      const updatedAssignment = await tx.assignment.update({
        where: { id },
        data: {
          ...(title && { title }),
          ...(description !== undefined && { description }),
          ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
          ...(status && { status }),
          ...(grade !== undefined && { grade }),
          ...(feedback !== undefined && { feedback }),
          ...(submittedAt !== undefined && { submittedAt: submittedAt ? new Date(submittedAt) : null }),
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
            select: {
              id: true,
              title: true,
              level: true,
            },
          },
          resources: {
            include: {
              resource: {
                select: {
                  id: true,
                  title: true,
                  type: true,
                  url: true,
                  thumbnail: true,
                },
              },
            },
            orderBy: { order: 'asc' },
          },
        },
      })

      // Update resources if provided
      if (resourceIds) {
        // Delete existing resource links
        await tx.assignmentResource.deleteMany({
          where: { assignmentId: id },
        })

        // Create new resource links
        if (resourceIds.length > 0) {
          await tx.assignmentResource.createMany({
            data: resourceIds.map((resourceId: string, index: number) => ({
              assignmentId: id,
              resourceId,
              order: index + 1,
            })),
          })
        }

        // Fetch updated assignment with new resources
        return await tx.assignment.findUnique({
          where: { id },
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
            course: {
              select: {
                id: true,
                title: true,
                level: true,
              },
            },
            resources: {
              include: {
                resource: {
                  select: {
                    id: true,
                    title: true,
                    type: true,
                    url: true,
                    thumbnail: true,
                  },
                },
              },
              orderBy: { order: 'asc' },
            },
          },
        })
      }

      return updatedAssignment
    })

    return NextResponse.json(assignment)
  } catch (error) {
    console.error('Error updating assignment:', error)
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Assignment not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/assignments - Delete assignment
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Assignment ID is required' },
        { status: 400 }
      )
    }

    await prisma.assignment.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Assignment deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting assignment:', error)
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: 'Assignment not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 