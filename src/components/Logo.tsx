import React from 'react'
import { Brain, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'default' | 'sidebar' | 'footer'
  className?: string
  showText?: boolean
  href?: string
}

export default function Logo({ 
  variant = 'default', 
  className,
  showText = true,
  href = '/'
}: LogoProps) {
  const getIcon = () => {
    switch (variant) {
      case 'sidebar':
        return <GraduationCap className="size-4" />
      default:
        return <Brain className="h-6 w-6" />
    }
  }

  const getTextSize = () => {
    switch (variant) {
      case 'sidebar':
        return 'text-sm'
      case 'footer':
        return 'text-lg'
      default:
        return 'text-2xl'
    }
  }

  const getContainerClasses = () => {
    switch (variant) {
      case 'sidebar':
        return 'flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'
      default:
        return 'flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white'
    }
  }

  const LogoContent = () => (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={getContainerClasses()}>
        {getIcon()}
      </div>
      {showText && (
        <h1 className={cn("font-bold text-gray-900 dark:text-white", getTextSize())}>
          Ace Tutor
        </h1>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="hover:opacity-80 transition-opacity">
        <LogoContent />
      </Link>
    )
  }

  return <LogoContent />
} 