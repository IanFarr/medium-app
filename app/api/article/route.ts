import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createArticleSchema = z.object({
  title: z.string().min(3).max(100),
  body: z.string().min(3),
  authorId: z.number(),
  tags: z.array(z.string()),
});

// GET - Fetch all articles
// Path: /api/article
// export async function GET(request: NextRequest) {
//   try {
//     const articles = await prisma.article.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//       include: {
//         author: {
//           select: {
//             name: true,
//           },
//         },
//       },
//     });
//     return NextResponse.json(articles, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: String(error) }, { status: 400 });
//   }
// }
export async function GET(request: NextRequest) {
  const take = Number(request.nextUrl.searchParams.get("take"));
  const lastCursor = Number(request.nextUrl.searchParams.get("lastCursor"));

  try {
    let result = await prisma.article.findMany({
      take: take ? take : 10,
      skip: lastCursor ? 1 : 0,
      cursor: lastCursor ? { id: lastCursor } : undefined,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    if (result.length == 0) {
      return new NextResponse(
        JSON.stringify({
          data: [],
          metaData: {
            lastCursor: null,
            hasNextPage: false,
          },
        }),
        { status: 200 }
      );
    }

    const lastPostInResults: any = result[result.length - 1];
    const cursor: any = lastPostInResults.id;

    const nextPage = await prisma.article.findMany({
      take: take ? take : 7,
      skip: 1,
      cursor: { id: cursor },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    const data = {
      data: result,
      metaData: {
        lastCursor: cursor,
        hasNextPage: nextPage.length > 0,
      },
    };
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}

// POST - Create a new article
// Path: /api/article
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createArticleSchema.safeParse(body);
  const defaultImage =
    "https://medium-ian-article-images.s3.us-west-1.amazonaws.com/defaultArticleImage";
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const newArticle = await prisma.article.create({
      data: {
        title: body.title,
        body: body.body,
        authorId: body.authorId,
        tags: body.tags,
        image: defaultImage,
      },
    });
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}

// PATCH - Update an article
// Path: /api/article/:id
export async function PATCH(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get("id"));
  const body = await request.json();
  const validation = createArticleSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
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
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}

// DELETE - Delete an article
// Path: /api/article/:id
export async function DELETE(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get("id"));

  try {
    const deletedArticle = await prisma.article.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(deletedArticle, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}
