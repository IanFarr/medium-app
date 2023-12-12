import prisma from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const createArticleSchema = z.object({
  title: z.string().min(3).max(100),
  body: z.string().min(3),
  authorId: z.number(),
  tags: z.array(z.string()),
});

// POST - Create a new article
// Path: /api/article
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createArticleSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const newArticle = await prisma.article.create({
    data: {
      title: body.title,
      body: body.body,
      authorId: body.authorId,
      tags: body.tags,
    },
  });

  return NextResponse.json(newArticle, { status: 201 });
}

// PATCH - Update an article
// Path: /api/article/:id
export async function PATCH(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get('id'));
  const body = await request.json();
  const validation = createArticleSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const updatedArticle = await prisma.article.update({
    where: {
      id: Number(id),
    },
    data: {
      title: body.title,
      body: body.body,
      tags: body.tags,
    },
  });

  return NextResponse.json(updatedArticle, { status: 200 });
}

// DELETE - Delete an article
// Path: /api/article/:id
export async function DELETE(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get('id'));

  const deletedArticle = await prisma.article.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(deletedArticle, { status: 200 });
}
