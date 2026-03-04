import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const API_KEY = process.env.API_KEY;

  try {
    const response = await fetch(
      `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`,
      {
        cache: "force-cache",
        next: { revalidate: 86400 },
      },
    );
    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.log("could not fetch mrp api", error);
    return NextResponse.json(
      { error: "Failed to fetch MRP data" },
      { status: 500 },
    );
  }
}
