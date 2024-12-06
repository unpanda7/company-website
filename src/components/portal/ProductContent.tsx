'use client'
import React, { useEffect } from 'react'
import { useProductStore, useCateStore } from '@/store/module/company'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Cate } from '@/lib/validations/cate'

const ProductContent = () => {
    const defaultCate = useCateStore((state) => state.defaultCate)
    const productList = useProductStore((state) => state.productList)
    const defaultProductList = useProductStore((state) => state.defaultProductList)
    const setDefaultCate = useCateStore((state) => state.setDefaultCate)
    const cateList = useCateStore((state) => state.cateList).slice(0, 8)
    const router = useRouter()
    function handleCateClick(cate: Cate) {
        setDefaultCate(cate.id)
        const name = cate.name
        router.push(`/product/${cate.id}?name=${name}`)
    }
    useEffect(() => {
        console.log('defaultCate', cateList)
    }, [defaultCate, cateList])

    return (
        <div className="w-full grid grid-cols-4 gap-4 my-8">
            {cateList.map((cate) => (
                <div
                    key={cate.id}
                    className="w-full h-48 rounded-lg relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300"
                    onClick={() => handleCateClick(cate)}
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
    )
}

export default ProductContent
