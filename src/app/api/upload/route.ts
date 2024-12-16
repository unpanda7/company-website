import { NextRequest, NextResponse } from "next/server";
import { writeFile } from 'fs/promises'
import path from 'path'
import fs from 'fs'
import { z } from 'zod'

const uploadSchema = z.object({
  file: z.instanceof(File).refine(file => file.size > 0, { message: '图片不能为空' }),
})

export async function POST(request:NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    const result = uploadSchema.safeParse({ file })
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid data', details: result.error.errors }, { status: 400 })
    }


    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(), 'public/uploads')

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const uniqueFileName = `${Date.now()}-${file.name}`
    const filePath = path.join(uploadDir, uniqueFileName)

    await writeFile(filePath, buffer)

    const fileUrl = `/uploads/${uniqueFileName}`

    return NextResponse.json({ url: fileUrl }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }

}