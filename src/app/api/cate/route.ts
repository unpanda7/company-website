import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'


export async function GET(request: NextRequest) {
  const cate = await prisma.cate.findMany()
  return NextResponse.json({ message: 'Hello, Next.js!', data: cate })
}
