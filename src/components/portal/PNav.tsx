'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter, usePathname } from 'next/navigation'
import { useCateStore } from '@/store/module/company'

const navList = [
  {
    label: '首页',
    href: '/',
    matchPaths: ['/']
  },
  {
    label: '关于公司',
    href: '/about',
    matchPaths: ['/about']
  },
  {
    label: '产品中心',
    href: '/product',
    matchPaths: ['/product'] // 当在首页且有 defaultCate 时也匹配
  },
  {
    label: '成功案例',
    href: '/case',
    matchPaths: ['/case']
  },
  {
    label: '人力资源',
    href: '/hr',
    matchPaths: ['/hr']
  },
  {
    label: '联系我们',
    href: '/contact',
    matchPaths: ['/contact']
  }
]

export default function PNav() {
  const router = useRouter()
  const pathname = usePathname()
  const cateList = useCateStore((state) => state.cateList)

  const jumpTo = (href: string) => {
    // 产品中心默认第一个产品
    if (href === '/product') {
      router.push(`/product/${cateList[0].id}`)
    } else {
      router.push(href)
    }
  }

  const isActive = (item: typeof navList[0]) => {
    // return item.matchPaths.includes(pathname)
    return pathname.startsWith(item.href)
  }

  return (
    <div className='w-full container mx-auto'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
        {navList.map((item) => (
            <Button
              key={item.label}
              variant='link'
              className={`
                text-secondary-foreground
                ${isActive(item)
                  ? 'font-semibold'
                  : 'text-secondary-foreground/80'
                }
              `}
              onClick={() => jumpTo(item.href)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}