import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'zh-CN'],
  defaultLocale: 'zh-CN',
  localePrefix: "always"
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};