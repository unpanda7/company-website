import BreadMenu from "@/components/portal/BreadMenu";
import PCarousel from "@/components/PCarousel";
import Products from "@/components/portal/Products";


export default async function Home() {
  return (
    <main>
      <PCarousel />
      {/* <BreadMenu /> */}
      <Products />
    </main>
  );
}
