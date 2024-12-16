import React from 'react'
import Image from 'next/image'
import { ColumnDef } from "@tanstack/react-table"
import { Carousel } from '@/lib/validations/carousel'

export const Columns: ColumnDef<Carousel>[] = [
  {
    accessorKey: 'imageUrl',
    header: '图片',
    cell: ({ row }) => {
      const imageUrl = row.original.imageUrl
      return <Image src={imageUrl} alt="Carousel Image" width={100} height={100} />
    },
  },
  {
    accessorKey: 'link',
    header: '链接',
  },
  {
    accessorKey: 'sort',
    header: '排序',
  },
  {
    id: 'actions',
  }
]