import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createClapSchema = z.object({
  articleId: z.number(),
  authorId: z.number(),
});

export async function fetchNumClapsByArticleId(articleId: number) {
  try {
    const claps = await prisma.clap.count({
      where: {
        articleId,
      },
    });
    return claps;
  } catch (error) {
    throw new Error(String(error));
  }
}

// POST - Create a new clap
// Path: /api/clap
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createClapSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const newClap = await prisma.clap.create({
    data: {
      articleId: body.articleId,
      authorId: body.authorId,
    }
  });

  return NextResponse.json(newClap, { status: 201 });
}