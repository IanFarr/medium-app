import prisma from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch article by ID
// Path: /api/article/:id
export async function GET(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get('id'));

  try {
    const article = await prisma.article.findUnique({
    where: {
      id,
    },
    include: {
      author: {
          select: {
            name: true,
          },
        },
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            body: true,
            createdAt: true,
            authorId: true,
            author: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}