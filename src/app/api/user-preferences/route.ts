import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/user-preferences - Get user preferences by user ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const preferences = await prisma.userPreferences.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    })

    if (!preferences) {
      return NextResponse.json(
        { error: 'User preferences not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(preferences)
  } catch (error) {
    console.error('Error fetching user preferences:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/user-preferences - Create new user preferences
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      theme = 'light',
      language = 'en',
      notifications = true,
      emailNotifications = true,
      pushNotifications = false,
      accessibilityMode = false,
      fontSize = 'medium',
    } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
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

    // Check if preferences already exist
    const existingPreferences = await prisma.userPreferences.findUnique({
      where: { userId },
    })

    if (existingPreferences) {
      return NextResponse.json(
        { error: 'User preferences already exist' },
        { status: 409 }
      )
    }

    const preferences = await prisma.userPreferences.create({
      data: {
        userId,
        theme,
        language,
        notifications,
        emailNotifications,
        pushNotifications,
        accessibilityMode,
        fontSize,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json(preferences, { status: 201 })
  } catch (error) {
    console.error('Error creating user preferences:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/user-preferences - Update user preferences
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      theme,
      language,
      notifications,
      emailNotifications,
      pushNotifications,
      accessibilityMode,
      fontSize,
    } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const preferences = await prisma.userPreferences.update({
      where: { userId },
      data: {
        ...(theme && { theme }),
        ...(language && { language }),
        ...(typeof notifications === 'boolean' && { notifications }),
        ...(typeof emailNotifications === 'boolean' && { emailNotifications }),
        ...(typeof pushNotifications === 'boolean' && { pushNotifications }),
        ...(typeof accessibilityMode === 'boolean' && { accessibilityMode }),
        ...(fontSize && { fontSize }),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json(preferences)
  } catch (error) {
    console.error('Error updating user preferences:', error)
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'User preferences not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/user-preferences - Delete user preferences
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    await prisma.userPreferences.delete({
      where: { userId },
    })

    return NextResponse.json(
      { message: 'User preferences deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting user preferences:', error)
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: 'User preferences not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 