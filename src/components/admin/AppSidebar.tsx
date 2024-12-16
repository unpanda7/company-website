'use client'
import { Home, LayoutDashboard, Store, Building2, Briefcase, Trophy } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'

const items = [
    {
        title: '仪表盘',
        url: '/admin/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: '首页管理',
        url: '/admin/home',
        icon: Home,
    },
    {
        title: '分类管理',
        url: '/admin/cate',
        icon: Store,
    },
    {
        title: '产品管理',
        url: '/admin/product',
        icon: Store,
    },
    {
        title: '公司管理',
        url: '/admin/company',
        icon: Building2,
    },
    {
        title: '职位管理',
        url: '/admin/works',
        icon: Briefcase,
    },
    {
        title: '成功案例',
        url: '/admin/success',
        icon: Trophy,
    },
]
function AppSidebar() {
    const pathname = usePathname()
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className='mb-4'>
                        <div className="text-2xl text-center font-semibold">后台管理系统</div>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = item.url === pathname
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild className={isActive ? 'bg-accent' : ''}>
                                            <Link href={item.url}>
                                                {item.icon && (
                                                    <item.icon className={isActive ? 'text-accent-foreground' : ''} />
                                                )}
                                                <span className={isActive ? 'text-accent-foreground' : ''}>
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar
