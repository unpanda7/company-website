import React from 'react'
import Image from 'next/image'
import { ColumnDef } from "@tanstack/react-table"
import { Cate } from '@/lib/validations/cate'

export const CateColumns: ColumnDef<Cate>[] = [

  {
    accessorKey: 'name',
    header: '名称',
  },
  {
    accessorKey: 'description',
    header: '描述',
  },
  {
    accessorKey: 'imageUrl',
    header: '图片',
    cell: ({ row }) => {
      const imageUrl = row.original.imageUrl
      return <Image src={imageUrl} alt="Carousel Image" width={40} height={60} />
    },
  },
  {
    accessorKey: 'order',
    header: '排序',
  },

  {
    id: 'actions',
  }
]