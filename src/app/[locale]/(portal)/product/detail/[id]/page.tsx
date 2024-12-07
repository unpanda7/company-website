"use client"

import React, { useEffect, useState } from 'react'
import { getProductDetail } from '@/app/_actions/company'
import { Product } from '@/lib/validations/company'
import Image from 'next/image'

interface ProductDetailProps {
  params: {
    id: string
  }
}

const ProductDetail = ({ params }: ProductDetailProps) => {
  const [product, setProduct] = useState<Product>()

  useEffect(() => {
    getProductDetail(params.id).then((res) => {
      setProduct(res)
    })
  }, [params.id])


  return (
    <div className=''>
      <div className='title text-2xl font-bold'>{product?.name}</div>
      <div className='text-sm text-gray-500'>{product?.description}</div>
      <div className='w-24 h-24 bg-blue-400 relative'>
        <Image
          src={product?.imageUrl}
          alt={product?.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover"
        />
      </div>
    </div>
  )
}

export default ProductDetail