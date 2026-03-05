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
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6);

    const startDateStr = startDate.toISOString().split("T")[0];
    const endDateStr = endDate.toISOString().split("T")[0];

    console.log(`Fetching NEO data from ${startDateStr} to ${endDateStr}`);

    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDateStr}&end_date=${endDateStr}&api_key=${API_KEY}`,
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
