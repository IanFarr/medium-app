import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { filename, contentType, articleId } = await request.json();
  const bucket = process.env.ARTICLE_IMAGES_BUCKET;
  if (!bucket) {
    throw new Error("ARTICLE_IMAGES_BUCKET is not set");
  }

  try {
    const client = new S3Client({ region: process.env.AWS_REGION });
    const key = uuidv4();
    const { url, fields } = await createPresignedPost(client, {
      Bucket: bucket,
      Key: key,
      Conditions: [
        ["content-length-range", 0, 10485760], // up to 10 MB
        ["starts-with", "$Content-Type", contentType],
      ],
      Fields: {
        acl: "public-read",
        "Content-Type": contentType,
      },
      Expires: 3600, // Seconds before the presigned post expires. 3600 by default.
    });

    const keyUrl = new URL(
      `https://medium-ian-article-images.s3.us-west-1.amazonaws.com/${key}`
    );

    return keyUrl.toString();
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message });
    } else {
      return Response.json({ error: "An unknown error occurred" });
    }
  }
}
