import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/courses - Get all courses with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') // For user's enrolled courses
    const isPublished = searchParams.get('isPublished')
    const level = searchParams.get('level')
    const category = searchParams.get('category')
    const isFree = searchParams.get('isFree')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}

    if (isPublished !== null) {
      where.isPublished = isPublished === 'true'
    }

    if (level) {
      where.level = level
    }

    if (category) {
      where.category = category
    }

    if (isFree !== null) {
      where.isFree = isFree === 'true'
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ]
    }

    // If userId is provided, get enrolled courses
    if (userId) {
      const enrollments = await prisma.courseEnrollment.findMany({
        where: { userId, isActive: true },
        include: {
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
        skip,
        take: limit,
        orderBy: { enrolledAt: 'desc' },
      })

      const total = await prisma.courseEnrollment.count({
        where: { userId, isActive: true },
      })

      return NextResponse.json({
        enrollments,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      })
    }

    // Get all courses
    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        include: {
          enrollments: {
            select: {
              id: true,
              progress: true,
              isActive: true,
            },
          },
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
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.course.count({ where }),
    ])

    return NextResponse.json({
      courses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/courses - Create new course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      image,
      isPublished = false,
      isFree = false,
      price,
      duration,
      level = 'BEGINNER',
      category,
      tags = [],
    } = body

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        image,
        isPublished,
        isFree,
        price: price ? parseFloat(price) : null,
        duration: duration ? parseInt(duration) : null,
        level,
        category,
        tags,
      },
      include: {
        enrollments: {
          select: {
            id: true,
            progress: true,
            isActive: true,
          },
        },
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
          },
        },
      },
    })

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/courses - Update course
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      id,
      title,
      description,
      image,
      isPublished,
      isFree,
      price,
      duration,
      level,
      category,
      tags,
    } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      )
    }

    const course = await prisma.course.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(image !== undefined && { image }),
        ...(typeof isPublished === 'boolean' && { isPublished }),
        ...(typeof isFree === 'boolean' && { isFree }),
        ...(price !== undefined && { price: price ? parseFloat(price) : null }),
        ...(duration !== undefined && { duration: duration ? parseInt(duration) : null }),
        ...(level && { level }),
        ...(category !== undefined && { category }),
        ...(tags && { tags }),
      },
      include: {
        enrollments: {
          select: {
            id: true,
            progress: true,
            isActive: true,
          },
        },
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
          },
        },
      },
    })

    return NextResponse.json(course)
  } catch (error) {
    console.error('Error updating course:', error)
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/courses - Delete course
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      )
    }

    await prisma.course.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Course deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting course:', error)
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 