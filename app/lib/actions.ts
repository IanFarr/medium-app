import prisma from "@/app/lib/prisma";

// Article Actions
export async function fetchAllArticles() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return articles;
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function fetchArticleById(id: number) {
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
    return article;
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function fetchArticlesByAuthorId(authorId: number) {
  try {
    const articles = await prisma.article.findMany({
      where: {
        authorId,
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
      },
    });
    return articles;
  } catch (error) {
    throw new Error(String(error));
  }
}

// Comment Actions
export async function fetchAllCommentsByArticleId(articleId: number) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        articleId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return comments;
  } catch (error) {
    throw new Error(String(error));
  }
}

// Follow Actions
export async function fetchAllFollowingByUserId(id: number) {
  try {
    const follows = await prisma.follow.findMany({
      where: {
        followerId: id,
      },
    });
    return follows;
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function fetchAllFollowersByUserId(id: number) {
  try {
    const follows = await prisma.follow.findMany({
      where: {
        followingId: id,
      },
    });
    return follows;
  } catch (error) {
    throw new Error(String(error));
  }
}

// User Actions
export async function fetchUserById(id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    throw new Error(String(error));
  }
}
