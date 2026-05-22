import { NextResponse } from "next/server";

export function GET(request: Request) {
  return NextResponse.redirect(new URL("/favicon.jpg?v=3", request.url), 308);
}
