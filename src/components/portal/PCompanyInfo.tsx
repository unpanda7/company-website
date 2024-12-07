"use client"

import React from 'react'
import { useCompanyStore } from '@/store/module/company'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
interface CompanyInfoProps {
  className?: string
  /** 字体大小 */
  fontSize?: string
  /** 字体粗细 */
  color?: string
}

const CompanyInfo = ({ className, fontSize, color }: CompanyInfoProps) => {
  const t = useTranslations()
  const companyInfo = useCompanyStore((state) => state.companyInfo)
  fontSize = fontSize || '14px'
  color = color || '#000'
  return (
    <div className={cn('container mx-auto', className)} style={{ fontSize, color }}>
      {
        companyInfo?.phone && <div>{t('company.phone')}: {companyInfo?.phone}</div>
      }
      {/* 电话 */}
      {
        companyInfo?.phone && <div>{t('company.phone')}: {companyInfo?.phone}</div>
      }
      {/* 传真 */}
      {
        companyInfo?.fax && <div>{t('company.fax')}: {companyInfo?.fax}</div>
      }
      {/* 邮箱 */}
      {
        companyInfo?.email && <div>{t('company.email')}: {companyInfo?.email}</div>
      }
      {/* 地址 */}
      {
        companyInfo?.address && <div>{t('company.address')}: {companyInfo?.address}</div>
      }
    </div>
  )
}

export default CompanyInfo