import { z } from 'zod'

export const cateSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string().nullable(),
  sort: z.number().default(0),
})

export type Cate = z.infer<typeof cateSchema>
