import { z } from 'zod'

export const companySchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string().nullable(),
  phone: z.string().nullable(),
  fax: z.string().nullable(),
  email: z.string().nullable(),
  address: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  wechatQR: z.string().nullable(),
  shortDesc: z.string().nullable(),
  fullDesc: z.string().nullable(),
  // 接受字符串或 Date 对象，并统一转换为 ISO 字符串
  createdAt: z.union([z.string(), z.date()]).transform((val) =>
    typeof val === 'string' ? val : val.toISOString()
  ),
  updatedAt: z.union([z.string(), z.date()]).transform((val) =>
    typeof val === 'string' ? val : val.toISOString()
  ),
})

export type CompanyInfo = z.infer<typeof companySchema>

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number().nullable(),
  imageUrl: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  categories: z.array(z.object({
    category: z.object({
      name: z.string()
    })
  }))
})

export type Product = z.infer<typeof productSchema>

/** 剔除 categories 字段 */
export const productWithoutCategoriesSchema = productSchema.omit({ categories: true })
export type ProductWithoutCategories = z.infer<typeof productWithoutCategoriesSchema>


export const successCaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string().nullable(),
  sort: z.number().default(0),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type SuccessCase = z.infer<typeof successCaseSchema>


export const recruitmentSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Recruitment = z.infer<typeof recruitmentSchema>