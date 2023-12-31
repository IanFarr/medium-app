import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const followSchema = z.object({
  followerId: z.number(),
  followingId: z.number(),
});

// POST - Create a new follow
// Path: /api/follow
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = followSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const newFollow = await prisma.follow.create({
      data: {
        followerId: body.followerId,
        followingId: body.followingId,
      }
    });
    return NextResponse.json(newFollow, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}

// DELETE - Delete a follow
// Path: /api/follow/:id
export async function DELETE(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get('id'));
  const followId = Number(id);

  try {
    const deletedFollow = await prisma.follow.delete({
      where: {
        id: followId,
      },
    });
    return NextResponse.json(deletedFollow, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}