'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const navList = [
  {
    label: '首页',
    href: '/'
  },
  {
    label: '关于公司',
    href: '/about'
  },
  {
    label: '产品中心',
    href: '/product'
  },
  {
    label: '成功案例',
    href: '/case'
  },
  {
    label: '人力资源',
    href: '/hr'
  },
  {
    label: '联系我们',
    href: '/contact'
  }
]

export default function PNav() {
  const router = useRouter()
  const jumpTo = (href: string) => {
    router.push(href)
  }
  return (
    <div className='w-full bg-black container mx-auto'>
      <div className=' flex justify-between items-center'>
        <div className='flex items-center'>
          {navList.map((item) => (
            <Button key={item.label} variant='link' className='text-white' onClick={() => jumpTo(item.href)}>{item.label}</Button>
          ))}
        </div>
      </div>

    </div>
  )
}
