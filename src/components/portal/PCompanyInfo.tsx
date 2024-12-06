"use client"

import React from 'react'
import { useCompanyStore } from '@/store/module/company'
import { cn } from '@/lib/utils'
interface CompanyInfoProps {
  className?: string
  /** 字体大小 */
  fontSize?: string
  /** 字体粗细 */
  color?: string
}

const CompanyInfo = ({ className, fontSize, color }: CompanyInfoProps) => {
  const companyInfo = useCompanyStore((state) => state.companyInfo)
  fontSize = fontSize || '14px'
  color = color || '#000'
  return (
    <div className={cn('container mx-auto', className)} style={{ fontSize, color }}>
      {
        companyInfo?.phone && <div>手机：{companyInfo?.phone}</div>
      }
      {/* 电话 */}
      {
        companyInfo?.phone && <div>电话：{companyInfo?.phone}</div>
      }
      {/* 传真 */}
      {
        companyInfo?.fax && <div>传真：{companyInfo?.fax}</div>
      }
      {/* 邮箱 */}
      {
        companyInfo?.email && <div>邮箱：{companyInfo?.email}</div>
      }
      {/* 地址 */}
      {
        companyInfo?.address && <div>地址：{companyInfo?.address}</div>
      }
    </div>
  )
}

export default CompanyInfo