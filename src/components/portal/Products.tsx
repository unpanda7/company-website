import React from 'react'
import PCate from './PCate'
import ProductContent from './ProductContent'

const Products = () => {
  return (
    <div className='container mx-auto flex mb-2'>
      {/* 左侧分类 */}
      <div className='w-1/5 mr-2'>
        <PCate />
      </div>
      {/* 右侧商品列表 */}
      <div className='w-4/5'>
        <ProductContent />
      </div>
    </div>
  )
}

export default Products