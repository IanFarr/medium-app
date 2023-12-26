import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// GET - Fetch six articles with the most claps
// Path: /api/article/trending
export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: {
        numClaps: "desc",
      },
      take: 6,
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}
