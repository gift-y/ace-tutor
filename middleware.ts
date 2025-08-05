import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  // Define protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/intro'];
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  );

  // Define public routes that don't need authentication
  const publicRoutes = ['/', '/about', '/faqs', '/api/auth'];
  const isPublicRoute = publicRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  );

  // // Only apply auth middleware to protected routes
  // if (isProtectedRoute) {
  //   return withAuth(req, {
  //     // Redirect to home page if not authenticated
  //     // afterAuth(auth, req) {
  //       if (!auth.isAuthenticated) {
  //         const homeUrl = new URL('/', req.url);
  //         return Response.redirect(homeUrl);
  //       }
  //       return Response.next();
  //     }
  //   });
  //     },
  //   // };


  // For public routes, just continue
  // return Response.next();
}

export const config = {
  matcher: [
    // Run on dashboard and intro routes
    '/dashboard/:path*',
    '/intro/:path*',
    // Also run on root to handle redirects
    '/',
  ]
};