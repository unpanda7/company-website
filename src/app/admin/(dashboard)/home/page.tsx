"use client"
import React, { useEffect, useState } from 'react'
import { Carousel, carouselFormSchema, CarouselForm } from '@/lib/validations/carousel'
import { DataTable } from '@/components/admin/DataTable/DataTable'
import { Columns } from '@/components/admin/DataTable/Columns'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {useDropzone} from 'react-dropzone'


const AdminHomePage = () => {
  const [carouselData, setCarouselData] = useState<Carousel[]>([])
  const [open, setOpen] = useState(false)

  const form = useForm<CarouselForm>({
    resolver: zodResolver(carouselFormSchema),
    defaultValues: {
      imageUrl: '',
      link: '',
      sort: 0,
    },
  })

  const onSubmit = (data: CarouselForm) => {
    console.log('data', data)
  }

  const fetchCarouselData = async () => {
    const response = await fetch('/api/carousel')
    const data = await response.json()
    setCarouselData(data)
  }
  useEffect(() => {
    fetchCarouselData()
  }, [])

  const handleDelete = async (id: string) => {
    console.log('id', id)
    const response = await fetch(`/api/carousel`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    })
    const data = await response.json()
    console.log('data', data)
    fetchCarouselData()
  }

  const handleEdit = async (id: string) => {
    const response = await fetch(`/api/carousel/${id}`, {
      method: 'PUT',
    })
    const data = await response.json()
    setCarouselData(data)
  }

  const openCarouselModal = async () => {
    console.log('openCarouselModal')
    setOpen(true)
  }



  const onOpenChange = (open: boolean) => {

  }

  return (
    <div className='w-full'>
      <div className='flex justify-end mb-2'>
        <Button size={'sm'} onClick={() => openCarouselModal()}>新增</Button>
      </div>
      <DataTable columns={Columns} data={carouselData} onEdit={handleEdit} onDelete={handleDelete} />
      <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>轮播图</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form>
            <FormField control={form.control} name="imageUrl" render={({ field }) => (
              <FormItem>
                <FormLabel>图片</FormLabel>
                <FormControl>
                  <Input type='file' accept='image/*' {...field} onChange={(e) => {
                    if (e.target.files?.[0]) {
                      field.onChange(e.target.files[0])
                    }
                  }} />
                </FormControl>
              </FormItem>
            )}>
            </FormField>

            <FormField control={form.control} name="link" render={({ field }) => (
              <FormItem>
                <FormLabel>链接</FormLabel>
                <FormControl>
                  <Input placeholder='请输入链接' {...field} value={field.value || ''} />
                </FormControl>
              </FormItem>
            )}>
            </FormField>

            <FormField control={form.control} name="sort" render={({ field }) => (
              <FormItem>
                <FormLabel>排序</FormLabel>
                <FormControl>
                  <Input type='number' placeholder='请输入排序' {...field} value={field.value || ''} />
                </FormControl>
              </FormItem>
            )}>
            </FormField>
          </form>
        </Form>
        <DialogFooter>
          <Button type="button" variant={'outline'} onClick={() => setOpen(false)}>取消</Button>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default AdminHomePage