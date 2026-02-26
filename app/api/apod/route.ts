import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const API_KEY = process.env.API_KEY;
  const startTime = Date.now();

  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`,
      {
        cache: "force-cache",
        next: { revalidate: 86400 },
      },
    );

    const data = await response.json();
    const endTime = Date.now();
    console.log(`APOD API response time: ${endTime - startTime}ms`);

    return NextResponse.json(data);
  } catch (error) {
    console.log("could not fetch apod api", error);
    return NextResponse.json(
      { error: "Failed to fetch APOD data" },
      { status: 500 },
    );
  }
}
