import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch followers by userId
// Path: /api/follow/followers?userId
export async function GET(request: NextRequest) {
  const userId = Number(request.nextUrl.searchParams.get('userId'));

  try {
    const followers = await prisma.follow.findMany({
      where: {
        followingId: Number(userId),
      },
      include: {
        follower: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json(followers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}