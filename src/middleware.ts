import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
const intlMiddleware = createMiddleware({
  locales: ['en', 'zh-CN'],
  defaultLocale: 'zh-CN',
  localePrefix: "always"
});

const whileList = ['/admin', "/login"]

export default async function middleware(request: NextRequest) {
  const pathname = new URL(request.url).pathname
  if (pathname.startsWith('/admin')) {
    // 判断是否登录
    if (!pathname.startsWith('/admin/login')) {
      const session = await getSession()
      if (!session.user?.isLoggedIn) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
    }
    return;
  }
  if (whileList.includes(pathname)) {
    return;
  }
  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};