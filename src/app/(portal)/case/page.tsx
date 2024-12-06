'use client'
import React, { useEffect, useState } from 'react'
import { getSuccessCaseList } from '@/app/_actions/company'
import { SuccessCase } from '@/lib/validations/company'
import Image from 'next/image'

const CasePage = () => {
    const [successCaseList, setSuccessCaseList] = useState<SuccessCase[]>([])

    const getSuccessCaseData = async () => {
        const successCaseList = await getSuccessCaseList()
        setSuccessCaseList(successCaseList)
    }

    useEffect(() => {
        getSuccessCaseData()
    }, [])

    return (
        <div className="container mx-auto p-4">
            <div className="mb-2 font-bold text-2xl">成功案例</div>
            <div className="flex flex-wrap gap-4">
                {successCaseList.map((successCase) => (
                    <div key={successCase.id}>
                        <Image src={successCase.imageUrl} alt={successCase.name} width={300} height={80} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CasePage
