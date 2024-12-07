'use client'
import React from 'react'
import Logout from './logout'

const AHeader = () => {
  return (
    <div className='flex justify-between items-center p-4'>
      <h1 className='text-2xl font-bold'>后台管理系统</h1>
      <Logout />
    </div>
  )
}

export default AHeader