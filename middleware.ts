import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "0");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set(
    "Content-Security-Policy",
    process.env.NODE_ENV === "development"
      ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://maps.googleapis.com; style-src 'self' 'unsafe-inline'; img-src 'self' https://*.tile.openstreetmap.org https://maps.gstatic.com https://*.google.com data:; frame-src https://www.google.com https://maps.google.com; connect-src 'self' https://maps.googleapis.com; font-src 'self';"
      : "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google.com https://maps.googleapis.com; style-src 'self' 'unsafe-inline'; img-src 'self' https://*.tile.openstreetmap.org https://maps.gstatic.com https://*.google.com data:; frame-src https://www.google.com https://maps.google.com; connect-src 'self' https://maps.googleapis.com; font-src 'self';"
  );

  return response;
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
