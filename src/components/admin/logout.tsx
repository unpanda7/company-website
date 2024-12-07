"use client"

import React, { useEffect, useState } from 'react'
import { logout } from '@/app/_actions/auth'
import { Button } from '@/components/ui/button'

const Logout = () => {


  const handleLogout = async () => {
    const res = await logout()
    if (res.success) {
      window.location.href = '/admin/login'
    }
  }


  return (
    <Button onClick={() => handleLogout()}>退出登录</Button>
  )
}

export default Logout