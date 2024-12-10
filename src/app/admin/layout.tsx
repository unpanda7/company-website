import React from 'react'
import { Metadata } from 'next'
import "../globals.css";


export const metadata: Metadata = {
  title: "后台",
  description: "管理后台",
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}

export default RootLayout