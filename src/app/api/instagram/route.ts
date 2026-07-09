import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "Instagram token missing" },
      { status: 500 }
    );
  }

  const response = await fetch(
    `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${token}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}