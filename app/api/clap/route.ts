import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createClapSchema = z.object({
  articleId: z.number(),
  userId: z.number(),
  claps: z.number(),
});

const uniqueArray = (arr: number[]) => {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
}

// POST - Create a new clap by articleId and userId
// Path: /api/clap
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createClapSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const currentNumClaps = await prisma.article.findUnique({
      where: {
        id: body.articleId,
      },
      select: {
        numClaps: true,
      },
    });
    const newClaps = await prisma.article.update({
      where: {
        id: body.articleId,
      },
      data: {
        numClaps: currentNumClaps?.numClaps + body.claps,
      },
      select: {
        numClaps: true,
      },
    });
    const currentClappedArticles = await prisma.user.findUnique({
      where: {
        id: body.userId,
      },
      select: {
        clappedArticles: true,
      },
    });
    const newClappedArticles = await prisma.user.update({
      where: {
        id: body.userId,
      },
      data: {
        clappedArticles: uniqueArray([...(currentClappedArticles?.clappedArticles || []), body?.articleId]),
      },
      select: {
        clappedArticles: true,
      },
    });
    return NextResponse.json({newClaps, newClappedArticles}, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}

// GET - Fetch num claps by articleId
// Path: /api/clap?articleId
export async function GET(request: NextRequest) {
  const articleId = Number(request.nextUrl.searchParams.get('articleId'));

  try {
    const numClaps = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
      select: {
        numClaps: true,
      },
    });
    return NextResponse.json(numClaps, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}