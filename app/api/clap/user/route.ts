import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch num claps by articleId and userId
// Path: /api/clap?articleId&authorId
export async function GET(request: NextRequest) {
  const articleId = Number(request.nextUrl.searchParams.get('articleId'));
  const userId = Number(request.nextUrl.searchParams.get('userId'));

  try {
    const numClaps = await prisma.clap.count({
      where: {
        articleId: Number(articleId),
        authorId: Number(userId),
      },
    });
    return NextResponse.json(numClaps, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}