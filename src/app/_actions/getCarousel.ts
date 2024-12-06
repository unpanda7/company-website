"use server"

import { prisma } from '@/lib/prisma'
import { carouselSchema } from '@/lib/validations/carousel'

export async function getCarousel() {
  const carousel = await prisma.carousel.findMany()
  return carouselSchema.array().parse(carousel)
}