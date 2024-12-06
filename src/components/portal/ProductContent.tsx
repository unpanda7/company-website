'use client'
import React, { useEffect } from 'react'
import { useProductStore, useCateStore } from '@/store/module/company'
import ProductList from './ProductList'
import Image from 'next/image'
const ProductContent = () => {
    const defaultCate = useCateStore((state) => state.defaultCate)
    const productList = useProductStore((state) => state.productList)
    const defaultProductList = useProductStore((state) => state.defaultProductList)
    const setDefaultCate = useCateStore((state) => state.setDefaultCate)
    const cateList = useCateStore((state) => state.cateList).slice(0, 8)
    function handleCateClick(cateId: string) {
        setDefaultCate(cateId)
    }
    useEffect(() => {
        console.log('defaultCate', defaultCate, cateList)
    }, [defaultCate, cateList])

    return (
        <div>
            {!defaultCate ? (
                <div className="grid grid-cols-4 gap-4">
                    {cateList.map((cate) => (
                        <div
                            key={cate.id}
                            className="w-full h-48 rounded-lg relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300"
                            onClick={() => handleCateClick(cate.id)}
                        >
                            <Image
                            src={cate.imageUrl}
                            alt={cate.name}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 25vw"
                            className="object-cover"
                        />
                        <p className="absolute bottom-4 z-10 w-full text-center text-white font-medium drop-shadow-lg">
                            {cate.name}
                        </p>
                    </div>
                    ))}
                </div>
            ) : (
                <ProductList />
            )}
        </div>
    )
}

export default ProductContent
