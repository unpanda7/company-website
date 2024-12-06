'use client'
import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Carousel } from '@/lib/validations/carousel'
import autoScroll from 'embla-carousel-autoplay'

type PropType = {
  slides: Carousel[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef] = useEmblaCarousel(options, [autoScroll()])

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={slide.id}>
              <img src={slide.imageUrl} alt={slide.link ?? ''} className='w-full max-h-[400px] object-cover' />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
