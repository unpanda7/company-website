import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export const locales = ['en', 'zh-CN'] as const
export const defaultLocale = 'zh-CN'
export const localePrefix = 'always' // Default

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales, localePrefix, defaultLocale })
