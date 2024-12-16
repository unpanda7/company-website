import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cateSchema } from '@/lib/validations/cate'

export async function GET() {
  const cate = await prisma.category.findMany()
  return NextResponse.json({ message: 'Hello, Next.js!', data: cate })
}


export async function POST(request: NextRequest) {
  const result = cateSchema.safeParse(await request.json())
  if (!result.success) {
    return NextResponse.json({ error: 'Invalid data', details: result.error.errors }, { status: 400 })
  }
  const cate = result.data
  await prisma.category.create({
    data: cate
  })
  return NextResponse.json({ message: '分类创建成功' })
}

export async function PUT(request: NextRequest) {
  const result = cateSchema.safeParse(await request.json())
  if (!result.success) {
    return NextResponse.json({ error: 'Invalid data', details: result.error.errors }, { status: 400 })
  }
  const cate = result.data
  await prisma.category.update({
    where: { id: cate.id },
    data: cate
  })
}

export async function DELETE(request: NextRequest) {
  const result = cateSchema.safeParse(await request.json())
  if (!result.success) {
    return NextResponse.json({ error: 'Invalid data', details: result.error.errors }, { status: 400 })
  }
  const cate = result.data
  await prisma.category.delete({
    where: { id: cate.id }
  })
  // 需要将被删除的分类从产品中移除
  await prisma.productCategory.deleteMany({
    where: { categoryId: cate.id }
  })

  return NextResponse.json({ message: '分类删除成功', data: cate })
}
