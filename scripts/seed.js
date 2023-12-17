const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  placeholderArticle,
} = require("../app/lib/placeholders/placeholder-article");
const {
  placeholderComment,
} = require("./../app/lib/placeholders/placeholder-comment");

const deleteData = async () => {
  try {
    await prisma.$connect();

    await prisma.user.deleteMany();
    console.log("Users deleted");

    await prisma.article.deleteMany();
    console.log("Articles deleted");

    await prisma.comment.deleteMany();
    console.log("Comments deleted");

    await prisma.follow.deleteMany();
    console.log("Follows deleted");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

const createUsers = async () => {
  const userIds = [];
  let res = await axios.post("http://localhost:3000/api/user/", {
    email: "testEmail1@test.com",
    name: "test name1",
    password: "testPassword",
    bio: "this is a test bio",
  });
  userIds.push(res.data.id);

  res = await axios.post("http://localhost:3000/api/user/", {
    email: "testEmail2@test.com",
    name: "test name2",
    password: "testPassword",
    bio: "this is a test bio",
  });
  userIds.push(res.data.id);
  console.log("seeded users");
  return userIds;
};

const createArticles = async (userIds) => {
  const articleIds = [];
  let res = await axios.post("http://localhost:3000/api/article/", {
    title: "test title1",
    body: placeholderArticle,
    tags: ["test"],
    authorId: userIds[0],
  });
  articleIds.push(res.data.id);

  res = await axios.post("http://localhost:3000/api/article/", {
    title: "test title2",
    body: placeholderArticle,
    tags: ["test"],
    authorId: userIds[1],
  });
  articleIds.push(res.data.id);
  console.log("seeded articles");
  return articleIds;
};

const createComments = async (userIds, articleIds) => {
  await axios.post("http://localhost:3000/api/comment/", {
    body: placeholderComment,
    authorId: userIds[0],
    articleId: articleIds[0],
  });

  await axios.post("http://localhost:3000/api/comment/", {
    body: placeholderComment,
    authorId: userIds[1],
    articleId: articleIds[0],
  });
  console.log("seeded comments");
};

const createFollows = async (userIds) => {
  await axios.post("http://localhost:3000/api/follow/", {
    followerId: userIds[0],
    followingId: userIds[1],
  });

  await axios.post("http://localhost:3000/api/follow/", {
    followerId: userIds[1],
    followingId: userIds[0],
  });
  console.log("seeded follows");
};

const seed = async () => {
  await deleteData();

  const userIds = await createUsers();
  const articleIds = await createArticles(userIds);
  await createComments(userIds, articleIds);
  await createFollows(userIds);
  console.log("seeded all data");
};

seed();
