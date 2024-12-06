'use client'
import React from 'react'
import { useCateStore } from '@/store/module/company'
import { Button } from '@/components/ui/button'
const PCate = () => {
    const cateList = useCateStore((state) => state.cateList)
    const defaultCate = useCateStore((state) => state.defaultCate)
    const setDefaultCate = useCateStore((state) => state.setDefaultCate)

    const jumpTo = (cateId: string) => {
        setDefaultCate(cateId)
    }

    return (
        <div className="flex flex-col max-h-[80vh] overflow-y-auto">
            <div className="bg-red-600 text-white text-center py-2">产品中心</div>
            <div className="flex flex-col w-full">
                {cateList.map((item) => (
                    <Button
                        key={item.id}
                        variant="link"
                        className={`text-black hover:bg-gray-100 ${defaultCate === item.id ? 'bg-gray-100 font-bold' : ''}`}
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
