import React from 'react'
import EmblaCarousel from './EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'
import './index.css'
import { getCarousel } from '@/app/_actions/getCarousel'

const PCarousel = async () => {
    const OPTIONS: EmblaOptionsType = {}
    const carousel = await getCarousel()
    return <div>
      <EmblaCarousel slides={carousel} options={OPTIONS} />
    </div>
}

export default PCarousel
