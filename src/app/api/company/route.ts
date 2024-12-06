import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { companySchema } from "@/lib/validations/company";
export async function GET() {
  try {
    const companyInfo = await prisma.companyInfo.findFirst();

    if (!companyInfo) {
      return NextResponse.json(
        { error: "Company information not found" },
        { status: 404 }
      );
    }

    const validatedCompanyInfo = companySchema.parse(companyInfo);

    return NextResponse.json(validatedCompanyInfo, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });
  } catch (error) {
    console.error("Error fetching company info:", error);
    return NextResponse.json(
      { error: "Failed to fetch company information" },
      { status: 500 }
    );
  }
}