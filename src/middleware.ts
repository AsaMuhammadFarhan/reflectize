import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { restApiMiddleware } from "./middleware/restApi";

export type ResponseBody = { code: number; message: string };
export function middleware(req: NextRequest) {
  // restApi middleware
  const restApiResponse = restApiMiddleware(req);
  if (restApiResponse instanceof Response) return restApiResponse;

  return NextResponse.next();
}
