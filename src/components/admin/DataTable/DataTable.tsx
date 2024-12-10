"use client"
import React from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onEdit,
  onDelete,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns: columns.map(col => {
      if (col.id === 'actions') {
        return {
          ...col,
          cell: ({ row }) => (
            <div className='text-right space-x-2'>
              {onEdit && (
                <Button size={'sm'} variant={'outline'} onClick={() => onEdit(row.original.id)}>
                  编辑
                </Button>
              )}
              {onDelete && (
                <Button size={'sm'} variant={'destructive'} onClick={() => onDelete(row.original.id)}>
                  删除
                </Button>
              )}
            </div>
          )
        }
      }
      return col
    }),
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}