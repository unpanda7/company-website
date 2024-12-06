'use client'

import { useEffect } from 'react'
import { useCompanyStore, useCateStore } from '@/store/module/company'
import type { CompanyInfo } from '@/lib/validations/company'
import type { Cate } from '@/lib/validations/cate'

interface CompanyProviderProps {
  initialCompanyInfo: CompanyInfo
  cateList: Cate[]
  children: React.ReactNode
}

export default function CompanyProvider({
  initialCompanyInfo,
  cateList,
  children
}: CompanyProviderProps) {
  const setCompanyInfo = useCompanyStore(state => state.setCompanyInfo)
  const setCateList = useCateStore(state => state.setCateList)
  useEffect(() => {
    setCompanyInfo(initialCompanyInfo)
  }, [initialCompanyInfo, setCompanyInfo])

  useEffect(() => {
    setCateList(cateList)
  }, [setCateList, cateList])

  return <>{children}</>
}