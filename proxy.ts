import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // 1) مش مسجل دخول
  if (!token) {
    // API ترجع 401 بدل redirect
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }
    const signInUrl = new URL("/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  const roleSlug = (token as any).roleSlug as string | null;

  // 2) صفحات وAPI الأدمن
  if (
    (pathname.startsWith("/admin") || pathname.startsWith("/api/protected/admin")) &&
    roleSlug !== "admin"
  ) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
    }
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // 3) صفحات وAPI المستخدم — مسموح للمستخدم والأدمن
  if (
    pathname.startsWith("/user") ||
    pathname.startsWith("/api/protected/users")
  ) {
    if (!token) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
    "/api/protected/:path*", // ← هذا هو المهم الناقص
  ],
};