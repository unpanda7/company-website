import { z } from 'zod'

export const cateSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: '分类名称不能为空' }),
  description: z.string().optional(),
  imageUrl: z.string().min(1, { message: '图片不能为空' }),
  order: z.number().default(0),
})

export type Cate = z.infer<typeof cateSchema>
