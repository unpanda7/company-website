'use client'

import React, { useState, useEffect } from 'react'
import { Cate, cateSchema } from '@/lib/validations/cate'
import { DataTable } from '@/components/admin/DataTable/DataTable'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CateColumns } from '@/components/admin/DataTable/CateColumns'

const defaultValues = {
    name: '',
    description: '',
    order: 0,
    imageUrl: '',
}

const AdminCatePage = () => {
    const [cateData, setCateData] = useState<Cate[]>([])
    const [open, setOpen] = useState(false)

    const form = useForm<Cate>({
        resolver: zodResolver(cateSchema),
        defaultValues,
    })
    async function getCateData() {
        const res = await fetch('/api/cate')
        const { data } = await res.json()
        setCateData(data)
    }

    useEffect(() => {
        getCateData()
    }, [])

    const handleEdit = (id: string) => {
        const cate = cateData.find(item => item.id === id)
        form.reset(cate)
        setOpen(true)
    }
    const handleDelete = async (id: string) => {
        const res = await fetch(`/api/cate`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
        await res.json()
        getCateData()
    }

    const onSubmit = async (data: Cate) => {
        const isEdit = data.id ? true : false
        if (isEdit) {
            const res = await fetch(`/api/cate`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            await res.json()
        } else {
            const res = await fetch(`/api/cate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            await res.json()
        }
        getCateData()
        handleClose()
    }

    const handleClose = () => {
        form.reset()
        setOpen(false)
    }

    return (
        <div className="w-full">
            <div className="flex justify-end mb-2">
                <Button size={'sm'} onClick={() => setOpen(true)}>
                    新增
                </Button>
            </div>
            <DataTable columns={CateColumns} data={cateData} onDelete={handleDelete} onEdit={handleEdit} />
            <Dialog open={open}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>分类管理</DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>分类名称</FormLabel>
                                        <FormControl>
                                            <Input {...field} value={field.value || ''} placeholder="请输入分类名称" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>分类描述</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="textarea"
                                                {...field}
                                                value={field.value || ''}
                                                placeholder="请输入分类描述"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="order"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>排序</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                value={field.value || ''}
                                                onChange={e => field.onChange(e.target.valueAsNumber)}
                                                placeholder="请输入排序"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

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
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    placeholder="请选择图片"
                                                    onChange={async (e) => {
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
                            />

                            <DialogFooter className="flex justify-end mt-2">
                                <Button type="button" variant={'outline'} onClick={() => handleClose()}>
                                    取消
                                </Button>
                                <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                                    保存
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AdminCatePage
