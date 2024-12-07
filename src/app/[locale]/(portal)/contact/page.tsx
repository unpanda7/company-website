"use client"
import React from 'react'
import { useCompanyStore } from '@/store/module/company'
import PCompanyInfo from '@/components/portal/PCompanyInfo'

const ContactPage = () => {
  const companyInfo = useCompanyStore((state) => state.companyInfo)
  return (
    <div className='p-4'>
      <div className='text-2xl font-bold'>{companyInfo?.name}</div>
      <PCompanyInfo />
    </div>
  )
}

export default ContactPage