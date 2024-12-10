'use client'

import React, { useEffect, useState } from 'react'
import { Metadata } from 'next'
import '../../globals.css'
import AHeader from '@/components/admin/AHeader'
import AppSidebar from '@/components/admin/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar />
                <div className="flex-1">
                    <AHeader />
                    <div className="p-4 flex-1">{children}</div>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default AdminLayout
