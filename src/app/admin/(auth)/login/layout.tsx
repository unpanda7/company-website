import React from 'react'
import { Metadata } from 'next'
import localFont from "next/font/local";
import "@/app/[locale]/(portal)/globals.css";

export const metadata: Metadata = {
  title: "后台",
  description: "管理后台",
};

const AdminLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}

export default AdminLayout