import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";
import { appRouter } from "@repo/api";
import { prisma } from "@repo/db";
import { auth } from "@/lib/auth";

const createContext = async (req: NextRequest) => {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  return {
    headers: req.headers,
    prisma,
    session,
  };
};

export function GET(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
  });
}

export function POST(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
  });
}
