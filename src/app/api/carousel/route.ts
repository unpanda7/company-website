import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export const revalidate = 60;

export async function GET() {
  try {
    const carousels = await prisma.carousel.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return new NextResponse(JSON.stringify(carousels), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, s-maxage=10, stale-while-revalidate=59`,
      }
    });
  } catch (error) {
    console.error("Error fetching carousels:", error);
    return NextResponse.json(
      { error: "Failed to fetch carousel data" },
      { status: 500 }
    );
  }
}