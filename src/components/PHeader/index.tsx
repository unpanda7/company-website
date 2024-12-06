"use client"

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCompanyStore } from '@/store/module/company'
import Image from 'next/image'

const PHeader = () => {
  const companyInfo = useCompanyStore(state => state.companyInfo)

  return (
    <div className='py-4 container mx-auto flex justify-between'>
      {/* left logo */}
      <div className='flex items-center space-x-2'>
        <span>{companyInfo?.name}</span>
        {
          companyInfo?.logo && (
            <Image src={companyInfo.logo} alt={companyInfo.name} width={100} height={100} />
          )
        }
      </div>
      {/* right menu */}
      <div className='flex items-center space-x-2'>
        <Input />
        <Button>搜索</Button>
      </div>
    </div>
  )
}

export default PHeader