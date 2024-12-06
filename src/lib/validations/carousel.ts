import { z } from 'zod'

export const carouselSchema = z.object({
  id: z.string(),
  imageUrl: z.string(),
  link: z.string().nullable(),
  sort: z.number().default(0),
})

export type Carousel = z.infer<typeof carouselSchema>