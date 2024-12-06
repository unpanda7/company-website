"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const PFooter = () => {
  const router = useRouter()
  return (
    <div className='w-full bg-[#262626]'>
      <div className='bg-[#2E2E2E] py-4'>
        <div className='container mx-auto'>
          <div className='flex'>
            {/* 走进我们 */}
            <div className='flex flex-col flex-1'>
              <div className='text-white text-lg font-bold mb-2'>走进我们</div>
              <div className='text-white text-sm'>
                <Button variant='link' className='text-white' onClick={() => router.push('/about')}>支持</Button>
              </div>
              <div className='text-white text-sm'>
                <Button variant='link' className='text-white' onClick={() => router.push('/about')}>技术支持</Button>
              </div>
            </div>

            {/* 产品中心 */}
            <div className='flex flex-col flex-1'>
              <div className='text-white text-lg font-bold mb-2'>产品中心</div>
              <div className='text-white text-sm'>
                <Button variant='link' className='text-white' onClick={() => router.push('/product')}>产品中心</Button>
              </div>
            </div>

            {/* 人力资源 */}
            <div className='flex flex-col flex-1'>
              <div className='text-white text-lg font-bold mb-2'>人力资源</div>
              <div className='text-white text-sm'>
                <Button variant='link' className='text-white' onClick={() => router.push('/about')}>招聘信息</Button>
              </div>
            </div>

            {/* 联系我们 */}
            <div className='flex flex-col flex-1'>
              <div className='text-white text-lg font-bold mb-2'>联系我们</div>
              <div className='text-white text-sm'>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto text-white'>
        <div className='flex flex-col items-center'>
          <p>Copyright © 2024 深圳市中科智联科技有限公司 版权所有</p>
        </div>
      </div>
    </div>
  )
}

export default PFooter