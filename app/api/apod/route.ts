import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const API_KEY = process.env.API_KEY;

  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`,
      {
        cache: "force-cache",
        next: { revalidate: 300 },
      },
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log("could not fetch apod api", error);
    return NextResponse.json(
      { error: "Failed to fetch popular games" },
      { status: 500 },
    );
  }
}
