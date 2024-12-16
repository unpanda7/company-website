import { z } from 'zod'

export const carouselSchema = z.object({
  id: z.string().nullable(),
  imageUrl: z.string().min(1, { message: '图片不能为空' }),
  link: z.string().optional(),
  sort: z.number().optional(),
})

export const carouselFormSchema = carouselSchema.omit({ id: true })

export type Carousel = z.infer<typeof carouselSchema>
export type CarouselForm = z.infer<typeof carouselFormSchema>