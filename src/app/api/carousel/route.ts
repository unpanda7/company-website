import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { carouselFormSchema } from '@/lib/validations/carousel'
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

export async function POST(request: Request) {
  const body = await request.json()

  const result = carouselFormSchema.safeParse(body)
  if(!result.success) {
    return NextResponse.json({ error: 'Invalid data', details: result.error.errors }, { status: 400 })
  }

  await prisma.carousel.create({
    data: result.data
  })

  return NextResponse.json({ message: '创建成功' }, { status: 200 })
}

export async function PUT(request: Request) {

  const body = await request.json()
  const result = carouselFormSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: 'Invalid data', details: result.error.errors }, { status: 400 })
  }

  await prisma.carousel.update({
    where: {
      id: body.id
    },
    data: result.data
  })

  return NextResponse.json({ message: '更新成功' }, { status: 200 })
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body
    console.log('id', id)

    await prisma.carousel.delete({
      where: {
        id
      }
    })
    return NextResponse.json({ message: '成功删除' }, { status: 200 })
  } catch (error) {
    console.error("Error deleting carousel:", error);
    return NextResponse.json(
      { error: "删除失败" },
      { status: 500 }
    );
  }
}