"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { LoginLink, RegisterLink, LogoutLink, useKindeAuth } from '@kinde-oss/kinde-auth-nextjs'
import Logo from './Logo'
import { User, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import LoadingSpinner from './LoadingSpinner'

interface UnifiedNavbarProps {
  variant?: 'landing' | 'dashboard'
  className?: string
}

export default function UnifiedNavbar({ variant = 'landing', className }: UnifiedNavbarProps) {
  const { isAuthenticated, user, isLoading } = useKindeAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const navigationItems = [
    { name: 'About', href: '/about' },
    { name: 'Features', href: '/#features' },
    { name: 'FAQ', href: '/faqs' },
  ]

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className={cn(
      "w-full z-50 transition-all duration-300",
      variant === 'landing' 
        ? "bg-white/80 backdrop-blur-md border-b border-gray-200/50" 
        : "bg-background border-b",
      className
    )}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo variant={variant === 'dashboard' ? 'sidebar' : 'default'} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {variant === 'landing' && (
              <>
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </>
            )}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {isLoading ? (
                <LoadingSpinner size="sm" text="" />
              ) : isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link href="/dashboard">
                    <Button variant="ghost" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <LogoutLink>
                    <Button variant="outline">Sign Out</Button>
                  </LogoutLink>
                </div>
              ) : (
                <>
                  <LoginLink postLoginRedirectURL="/intro">
                    <Button variant="ghost">Sign In</Button>
                  </LoginLink>
                  <RegisterLink postLoginRedirectURL="/intro">
                    <Button>Get Started</Button>
                  </RegisterLink>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMobileMenuToggle}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              {variant === 'landing' && (
                <>
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </>
              )}

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                {isLoading ? (
                  <LoadingSpinner size="sm" text="" />
                ) : isAuthenticated ? (
                  <>
                    <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <LogoutLink>
                      <Button variant="outline" className="w-full">
                        Sign Out
                      </Button>
                    </LogoutLink>
                  </>
                ) : (
                  <>
                    <LoginLink postLoginRedirectURL="/intro">
                      <Button variant="ghost" className="w-full">
                        Sign In
                      </Button>
                    </LoginLink>
                    <RegisterLink postLoginRedirectURL="/intro">
                      <Button className="w-full">
                        Get Started
                      </Button>
                    </RegisterLink>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 