import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20),
  name: z.string().min(3).max(20),
  password: z.string().min(8),
  bio: z.string().max(280),
  birthday: z.coerce.date(),
});

const updateUserSchema = z.object({
  bio: z.string().max(280),
});

// POST - Create a new user
// Path: /api/user
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createUserSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);
  body.password = hashedPassword;

  try {
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        username: body.username,
        name: body.name,
        password: body.password,
        bio: body.bio,
        birthday: body.birthday,
      }
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}

// PATCH - Update a user
// Path: /api/user/:id
export async function PATCH(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get('id'));
  const body = await request.json();
  const validation = updateUserSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        bio: body.bio,
      }
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}

// DELETE - Delete a user
// Path: /api/user/:id
export async function DELETE(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get('id'));

  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(id),
      }
    });
    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}

// GET - Fetch user by id
// Path: /api/user/:id
export async function GET(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get('id'));

  try {
    const user = await prisma.user.findUnique({
      where: {
      id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      username: true,
      bio: true,
      articles: {
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          title: true,
          tags: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
  return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}
