import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const authenticateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// POST - Authenticate a user
// Path: /api/auth
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = authenticateUserSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const validPassword = await bcrypt.compare(body.password, user.password);
  if (!validPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  }

  return NextResponse.json(user, { status: 200 });
}