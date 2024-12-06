'use client'

import React, { useEffect, useState } from 'react'
import { getProductListByCate } from '@/app/_actions/company'
import { Product } from '@/lib/validations/company'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {CustomPagination} from '@/components/CustomPagination'

interface CateDetailProps {
    params: {
        cate: string
    }
}

const CateDetail = ({ params }: CateDetailProps) => {
    const router = useRouter()
    const [productList, setProductList] = useState<Product[]>([])
    const [total, setTotal] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10

    function jumpDetail(productId: string) {
        router.push(`/product/detail/${productId}?cate=${params.cate}`)
    }

    const searchParams = {
        cateId: params.cate,
        page: currentPage,
        pageSize: pageSize,
    }
    async function getProductData() {
        const res = await getProductListByCate(searchParams)
        setProductList(res.productList)
        setTotal(res.total)
    }

    useEffect(() => {
        console.log('params.cate effect', params.cate)
        getProductData()
    }, [params.cate, currentPage])

    return (
        <div>
            <div className="flex flex-col">
                {productList.map((product) => (
                    <div
                        key={product.id}
                        className="flex w-full mb-2 border p-4 cursor-pointer hover:border-blue-400 transition-all duration-300"
                        onClick={() => jumpDetail(product.id)}
                    >
                        <div className="w-24 h-24 bg-blue-400 relative">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 25vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col flex-1 p-2 relative">
                            <p className="text-lg font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.description}</p>
                            <Button className="absolute bottom-2 right-2">查看更多</Button>
                        </div>
                    </div>
                ))}
            </div>
            <CustomPagination
                currentPage={currentPage}
                totalItems={total}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}

export default CateDetail
