import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../globals.css";
import PHeader from "@/components/PHeader";
import PNav from "@/components/portal/PNav";
import CompanyProvider from "@/components/providers/CompanyProvider";
import { getCompanyInfo, getCateList } from "@/app/_actions/company";
import PFooter from "@/components/portal/PFooter";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages} from 'next-intl/server'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  let companyInfo;
  let cateList;
  const messages = await getMessages();

  try {
    companyInfo = await getCompanyInfo();
    cateList = await getCateList();
  } catch (error) {
    console.error("获取公司信息或分类列表失败:", error);
    companyInfo = {
      id: '',
      name: 'Company Name',
      logo: null,
      phone: null,
      fax: null,
      email: null,
      address: null,
      latitude: null,
      longitude: null,
      wechatQR: null,
      shortDesc: null,
      fullDesc: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    cateList = [
      {
        id: '',
        name: '未分类',
        sort: 0,
        imageUrl: null
      },
    ];
  }


  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider enableColorScheme disableTransitionOnChange>
            <CompanyProvider initialCompanyInfo={companyInfo} cateList={cateList}>
              <div className="flex flex-col min-h-screen">
                <PHeader />
                <PNav />
                <main className="flex-1 min-h-[calc(100vh-200px)]">
                  {children}
                </main>
                <PFooter />
              </div>
            </CompanyProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
