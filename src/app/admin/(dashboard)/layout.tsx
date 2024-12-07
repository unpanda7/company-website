'use client'

import React, { useEffect, useState } from 'react'
import { Metadata } from 'next'
import "@/app/[locale]/(portal)/globals.css"
import AHeader from '@/components/admin/AHeader'

const AdminLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <AHeader />
      <div className='flex-1 p-4'>
        {children}
      </div>
    </div>
  )
}

export default AdminLayout