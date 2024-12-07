"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import PCompanyInfo from './PCompanyInfo'

const PFooter = () => {
  const t = useTranslations()
  const router = useRouter()
  const [year, setYear] = useState(new Date().getFullYear())
  return (
    <div className='w-full bg-[#262626]'>
      <div className='bg-[#2E2E2E] py-4'>
        <div className='container mx-auto'>
          <div className='flex'>
            {/* 走进我们 */}
            <div className='flex flex-col flex-1'>
              <div className='text-white text-lg font-bold mb-2'>{t('footer.aboutUs')}</div>
              <div className='text-white text-sm'>
                <Button variant='link' className='text-white' onClick={() => router.push('/about')}>{t('footer.support')}</Button>
              </div>
              <div className='text-white text-sm'>
                <Button variant='link' className='text-white' onClick={() => router.push('/about')}>{t('footer.technicalSupport')}</Button>
              </div>
            </div>

            {/* 产品中心 */}
            <div className='flex flex-col flex-1'>
              <div className='text-white text-lg font-bold mb-2'>{t('footer.products')}</div>
              <div className='text-white text-sm'>
                <Button variant='link' className='text-white' onClick={() => router.push('/product')}>{t('footer.products')}</Button>
              </div>
            </div>

            {/* 人力资源 */}
            <div className='flex flex-col flex-1'>
              <div className='text-white text-lg font-bold mb-2'>{t('footer.hr')}</div>
              <div className='text-white text-sm'>
                <Button variant='link' className='text-white' onClick={() => router.push('/about')}>{t('footer.recruitment')}</Button>
              </div>
            </div>

            {/* 联系我们 */}
            <div className='flex flex-col flex-1'>
              <div className='text-white text-lg font-bold mb-2'>{t('footer.contact')}</div>
              <PCompanyInfo color='#fff' />
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto text-white'>
        <div className='flex flex-col items-center'>
          <p>{t('footer.copyright', { year })}</p>
        </div>
      </div>
    </div>
  )
}

export default PFooter