import { type NextRequest, NextResponse } from "next/server";

export function restApiMiddleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const key = req.headers.get("x-api-key");
  const AUTH_MATCHER = "/api/v1";

  if (
    pathname.includes(AUTH_MATCHER) &&
    !pathname.includes("/api/auth/unauthorized") &&
    key != process.env.REST_API_KEY
  ) {
    return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
  }
}
