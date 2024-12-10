'use client'
import React from 'react'
import Logout from './logout'
import { SidebarTrigger } from '@/components/ui/sidebar'
const AHeader = () => {

  return (
    <div className='flex justify-between items-center p-4 border-b border-gray-200'>
      <div>
        <SidebarTrigger />
      </div>
      <Logout />
    </div>
  )
}

export default AHeader