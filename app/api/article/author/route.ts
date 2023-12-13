import prisma from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch articles by author ID
// Path: /api/article/author/:id
export async function GET(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get('id'));

  try {
    const articles = await prisma.article.findMany({
      where: {
        authorId: id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            claps: true,
          },
        },
      },
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}