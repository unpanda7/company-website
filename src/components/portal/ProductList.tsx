"use client"

import React from 'react'
import { useProductStore } from '@/store/module/company'
import Image from 'next/image'
import { Button } from '../ui/button'

const ProductList = () => {
    const productList = useProductStore((state) => state.productList)
    return (
        <div className='flex flex-col'>
          {/* content */}
          {productList.map((product) => (
            <div key={product.id} className='flex w-full mb-2 border p-4 cursor-pointer hover:border-blue-400 transition-all duration-300'>
              <div className='w-48 h-48 bg-blue-400 relative'>
                <Image src={product.imageUrl} alt={product.name} fill priority sizes='(max-width: 768px) 100vw, 25vw' className='object-cover' />
              </div>
              <div className='flex flex-col flex-1 p-2 relative'>
                <p className='text-lg font-medium'>{product.name}</p>
                <p className='text-sm text-gray-500'>{product.description}</p>
                <Button className='absolute bottom-2 right-2'>查看更多</Button>
              </div>
            </div>
          ))}

        </div>
  )
}

export default ProductList