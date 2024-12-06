import { create } from "zustand";
import { CompanyInfo, Product } from "@/lib/validations/company";
import { Cate } from "@/lib/validations/cate";
import { getProductListByCate, getProductList } from "@/app/_actions/company";
interface CompanyState {
  companyInfo: CompanyInfo | null
  setCompanyInfo: (companyInfo: CompanyInfo) => void
}

export const useCompanyStore = create<CompanyState>((set) => ({
  companyInfo: null,
  setCompanyInfo: (companyInfo) => set({ companyInfo }),
}))


interface CateState {
  cateList: Cate[]
  defaultCate: string
  setDefaultCate: (defaultCate: string) => void
  setCateList: (cateList: Cate[]) => void
}

export const useCateStore = create<CateState>((set) => ({
  cateList: [],
  defaultCate: '',
  setCateList: (cateList) => set({ cateList }),
  setDefaultCate: (defaultCate: string) => {
    set({ defaultCate })
  },
}))

interface ProductState {
  productList: Product[]
  defaultProductList: Product[]
  total: number
  setProductList: (productList: Product[]) => void
  setDefaultProductList: (defaultProductList: Product[]) => void
  setTotal: (total: number) => void
}

export const useProductStore = create<ProductState>((set) => ({
  productList: [],
  defaultProductList: [],
  total: 0,
  setProductList: (productList) => set({ productList }),
  setDefaultProductList: (defaultProductList) => set({ defaultProductList }),
  setTotal: (total) => set({ total }),
}))