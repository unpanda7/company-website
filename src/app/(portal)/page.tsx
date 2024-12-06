import BreadMenu from "@/components/portal/BreadMenu";
import PCarousel from "@/components/PCarousel";
import Products from "@/components/portal/Products";
import { companySchema } from "@/lib/validations/company";

async function getCompanyInfo() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/company`, {
    next: { revalidate: 60 }, // 缓存一分钟
  });
  if (!res.ok) throw new Error('Failed to fetch company info');

  const data = await res.json();

  return companySchema.parse(data);
}

async function getCarousels() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/carousel`, {
    next: { revalidate: 3600 }, // 缓存一小时
  });
  if (!res.ok) throw new Error('Failed to fetch carousels');
  return res.json();
}

export default async function Home() {
  return (
    <main>
      <PCarousel />
      <BreadMenu />
      <Products />
    </main>
  );
}
