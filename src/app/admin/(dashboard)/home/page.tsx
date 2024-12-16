'use client'
import React, { useEffect, useState } from 'react'
import { Carousel, carouselFormSchema, CarouselForm } from '@/lib/validations/carousel'
import { DataTable } from '@/components/admin/DataTable/DataTable'
import { Columns } from '@/components/admin/DataTable/Columns'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const defaultValues = {
    imageUrl: '',
    link: '',
    sort: 0,
}

const AdminHomePage = () => {
    const [carouselData, setCarouselData] = useState<Carousel[]>([])
    const [open, setOpen] = useState(false)

    const form = useForm<CarouselForm>({
        resolver: zodResolver(carouselFormSchema),
        defaultValues,
    })

    const onSubmit = async (data: CarouselForm) => {
        const isEdit = !!data.id
        if (isEdit) {
          const response = await fetch(`/api/carousel`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...data
            }),
          })
          await response.json()
        } else {

          const response = await fetch('/api/carousel', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          })
          await response.json()
        }
        fetchCarouselData()
        form.reset(defaultValues)
        setOpen(false)
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
            body: JSON.stringify({ id }),
        })
        const data = await response.json()
        console.log('data', data)
        fetchCarouselData()
    }

    const handleEdit = async (id: string) => {
        const carousel = carouselData.find(item => item.id === id)
        form.reset(carousel)
        setOpen(true)
    }


    const handleClose = () => {
        form.reset(defaultValues)
        setOpen(false)
    }

    return (
        <div className="w-full">
            <div className="flex justify-end mb-2">
                <Button size={'sm'} onClick={() => setOpen(true)}>
                    新增
                </Button>
            </div>
            <DataTable columns={Columns} data={carouselData} onEdit={handleEdit} onDelete={handleDelete} />
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>轮播图</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form>
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>图片</FormLabel>
                                        <FormControl>
                                            <div className="flex flex-col gap-2">
                                                {field.value && (
                                                    <img
                                                        src={field.value}
                                                        alt="preview"
                                                        className="w-40 h-40 object-cover rounded-md"
                                                    />
                                                )}
                                                <Input type="file" accept='image/*' placeholder='请选择图片' onChange={async (e) => {
                                                  const file = e.target.files?.[0]
                                                  const formData = new FormData()
                                                  formData.append('file', file)

                                                  try {
                                                    const response = await fetch('/api/upload', {
                                                      method: 'POST',
                                                      body: formData,
                                                    })
                                                    const data = await response.json()
                                                    field.onChange(data.url)
                                                  } catch (error) {
                                                    console.log('error', error)
                                                  }
                                                }}
                                                />
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            ></FormField>

                            <FormField
                                control={form.control}
                                name="link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>链接</FormLabel>
                                        <FormControl>
                                            <Input placeholder="请输入链接" {...field} value={field.value || ''} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            ></FormField>

                            <FormField
                                control={form.control}
                                name="sort"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>排序</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="请输入排序"
                                                {...field}
                                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                                value={field.value || ''}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            ></FormField>
                        </form>
                    </Form>
                    <DialogFooter>
                        <Button type="button" variant={'outline'} onClick={() => handleClose()}>
                            取消
                        </Button>
                        <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                            保存
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AdminHomePage
