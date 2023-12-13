import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createClapSchema = z.object({
  articleId: z.number(),
  userId: z.number(),
});

// POST - Create a new clap
// Path: /api/clap
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createClapSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const newClap = await prisma.clap.create({
      data: {
        articleId: body.articleId,
        clapperId: body.userId,
      }
    });
    return NextResponse.json(newClap, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}

// GET - Fetch num claps by articleId
// Path: /api/clap?articleId
export async function GET(request: NextRequest) {
  const articleId = Number(request.nextUrl.searchParams.get('articleId'));

  try {
    const numClaps = await prisma.clap.count({
      where: {
        articleId,
      },
    });
    return NextResponse.json(numClaps, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}