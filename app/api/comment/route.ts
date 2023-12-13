import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createCommentSchema = z.object({
  body: z.string().min(3),
  articleId: z.number(),
  authorId: z.number(),
});

// POST - Create a new comment
// Path: /api/comment
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createCommentSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        body: body.body,
        articleId: body.articleId,
        authorId: body.authorId,
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}

// PATCH - Update a comment
// Path: /api/comment/:id
export async function PATCH(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get('id'));
  const body = await request.json();
  try {
    const updatedComment = await prisma.comment.update({
      where: {
        id: Number(id),
      },
      data: {
        body: body.body,
      },
    });
    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    throw new Error(String(error));
  }
}

// DELETE - Delete a comment
// Path: /api/comment/:id
export async function DELETE(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get('id'));
  try {
    const deletedComment = await prisma.comment.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(deletedComment, { status: 200 });
  } catch (error) {
    throw new Error(String(error));
  }
}

// GET - Fetch all comments by articleId
// Path: /api/comment?articleId
export async function GET(request: NextRequest) {
  const articleId = Number(request.nextUrl.searchParams.get('articleId'));

  try {
    const comments = await prisma.comment.findMany({
      where: {
        articleId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}