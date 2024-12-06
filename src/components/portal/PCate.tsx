'use client'
import React from 'react'
import { useCateStore } from '@/store/module/company'
import { Button } from '@/components/ui/button'
import {  usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'


const PCate = () => {
    const cateList = useCateStore((state) => state.cateList)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const jumpTo = (cateId: string) => {
        router.push(`/product/${cateId}`)
    }

    const isActive = (cateId: string) => {
      if (pathname.startsWith(`/product/detail`)) {
        return cateId === searchParams.get('cate')
      }
      return pathname === `/product/${cateId}`
    }


    return (
        <div className="flex flex-col max-h-[80vh] overflow-y-auto">
            <div className="bg-primary text-primary-foreground text-white text-center py-2">产品中心</div>
            <div className="flex flex-col w-full">
                {cateList.map((item) => (
                    <Button
                        key={item.id}
                        variant="link"
                        className={`text-accent-foreground hover:bg-muted ${isActive(item.id) ? 'bg-secondary font-bold' : ''}`}
                        onClick={() => jumpTo(item.id)}
                    >
                        {item.name}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default PCate
