import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch following by userId
// Path: /api/follow/following?userId
export async function GET(request: NextRequest) {
  const userId = Number(request.nextUrl.searchParams.get('userId'));

  try {
    const following = await prisma.follow.findMany({
      where: {
        followerId: Number(userId),
      },
      include: {
        following: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json(following, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}