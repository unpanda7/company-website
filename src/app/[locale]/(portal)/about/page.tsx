"use client"
import React from 'react'
import PCompanyInfo from '@/components/portal/PCompanyInfo'
import { useCompanyStore } from '@/store/module/company'
import { useTranslations } from 'next-intl'

const AboutPage = () => {
  const t = useTranslations()
  const companyInfo = useCompanyStore((state) => state.companyInfo)

  return (
    <div className='container mx-auto flex mt-2'>

      <div className='w-1/5 mr-2'>
        <div className='text-2xl font-bold bg-primary text-white p-1 text-center'>{t('about.aboutUs')}</div>
        <PCompanyInfo className='space-y-2 text-center mt-2' />
      </div>
      <div className='w-4/5'>
        <div className='p-2'>
          {companyInfo?.fullDesc}
        </div>
      </div>
    </div>
  )
}

export default AboutPage