import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    return NextResponse.json(
      { error: "NASA API key not found" },
      { status: 500 },
    );
  }

  try {
    const today = new Date().toISOString().split("T")[0];
    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${API_KEY}`,
      {
        cache: "force-cache",
        next: { revalidate: 86400 },
      },
    );

    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log("could not fetch neo api", error);
    return NextResponse.json(
      { error: "Failed to fetch NEO data" },
      { status: 500 },
    );
  }
}
