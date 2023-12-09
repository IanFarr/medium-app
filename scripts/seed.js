const { db } = require("@vercel/postgres");
const {
  users,
  articles,
  comments,
  follows,
  claps,
} = require("../app/lib/placeholders/placeholder-data");
const { PrismaClient } = require("@prisma/client");

const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function seedUsers(client) {
  try {
    users.map(async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
      return client.user.create({
        data: user,
      });
    });
    console.log("Users seeded");
  } catch (error) {
    console.error(error);
  }
}

async function seedArticles(client) {
  try {
    await client.article.createMany({
      data: articles,
    });
    console.log("Articles seeded");
  } catch (error) {
    console.error(error);
  }
}

async function seedComments(client) {
  try {
    await client.comment.createMany({
      data: comments,
    });
    console.log("Comments seeded");
  } catch (error) {
    console.error(error);
  }
}

async function seedFollows(client) {
  try {
    await client.follow.createMany({
      data: follows,
    });
    console.log("Follows seeded");
  } catch (error) {
    console.error(error);
  }
}

async function seedClaps(client) {
  try {
    await client.clap.createMany({
      data: claps,
    });
    console.log("Claps seeded");
  } catch (error) {
    console.error(error);
  }
}

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

    await prisma.clap.deleteMany();
    console.log("Claps deleted");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

const seedPlaceholderUsers = async (client) => {
  try {
    await seedUsers(client);
  } catch (error) {
    console.error(error);
  }
};

const seedPlaceholderData = async () => {
  try {
    await prisma.$connect();

    await seedArticles(prisma);
    await seedComments(prisma);
    await seedFollows(prisma);
    await seedClaps(prisma);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

const load = async () => {
  try {
    await prisma.$connect();
    await deleteData();
    await seedPlaceholderUsers(prisma);
    await seedPlaceholderData();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load().catch((e) =>
  console.error(`an error occured while seeding the database: ${e}`)
);
