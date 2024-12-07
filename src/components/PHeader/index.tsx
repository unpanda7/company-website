'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCompanyStore } from '@/store/module/company'
import Image from 'next/image'
import { ThemeToggle } from '@/components/portal/ThemeToggle'
import { useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'

const PHeader = () => {
    const companyInfo = useCompanyStore((state) => state.companyInfo)
    const router = useRouter()
    const pathname = usePathname()

    const t = useTranslations('common')

    const handleLanguageChange = (locale: string) => {
        router.replace(pathname, { locale })
    }

    return (
        <div className="py-4 container mx-auto flex justify-between">
            {/* left logo */}
            <div className="flex items-center space-x-2">
                <span>{companyInfo?.name}</span>
                {companyInfo?.logo && <Image src={companyInfo.logo} alt={companyInfo.name} width={100} height={100} />}
            </div>
            {/* right menu */}
            <div className="flex items-center space-x-2">
                <Input />
                <Button>{t('search')}</Button>
                <ThemeToggle />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Globe className="h-[2rem] w-[2rem]" />
                            <span className="sr-only">Switch language</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleLanguageChange('zh-CN')}>中文</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleLanguageChange('en')}>English</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default PHeader
