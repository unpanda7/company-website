'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter, usePathname } from '@/i18n/routing'
import { useCateStore } from '@/store/module/company'
import { useTranslations } from 'next-intl'

const PNav = () => {
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const cateList = useCateStore((state) => state.cateList)

  const navList = [
    {
      label: t('nav.home'),
      href: '/',
      matchPaths: ['/']
    },
    {
      label: t('nav.about'),
      href: '/about',
      matchPaths: ['/about']
    },
    {
      label: t('nav.products'),
      href: '/product',
      matchPaths: ['/product']
    },
    {
      label: t('nav.cases'),
      href: '/case',
      matchPaths: ['/case']
    },
    {
      label: t('nav.hr'),
      href: '/hr',
      matchPaths: ['/hr']
    },
    {
      label: t('nav.contact'),
      href: '/contact',
      matchPaths: ['/contact']
    }
  ]

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

export default PNav