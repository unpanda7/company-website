"use server"

import { prisma } from "@/lib/prisma";
import { companySchema, productSchema, productWithoutCategoriesSchema } from "@/lib/validations/company";
import { cateSchema } from "@/lib/validations/cate";
export async function getCompanyInfo() {
  try {
    const companyInfo = await prisma.companyInfo.findFirst();
    if (!companyInfo) {
      throw new Error("公司信息未找到")
    }
    return companySchema.parse(companyInfo);
  } catch (error) {
    console.error("获取公司信息失败:", error);
    throw new Error("获取公司信息失败")
  }
}

export async function getCateList() {
  const cateList = await prisma.category.findMany()
  console.log('cateList', cateList)
  return cateSchema.array().parse(cateList)
}

interface GetProductListParams {
  cateId: string
  page: number
  pageSize: number
}

export async function getProductListByCate({ cateId, page = 1, pageSize = 10 }: GetProductListParams) {

  const skip = (page - 1) * pageSize

  const productList = await prisma.product.findMany({
    where: {
      categories: {
        some: {
          categoryId: cateId
        }
      }
    },
    include: {
      categories: {
        include: {
          category: {
            select: {
              name: true
            }
          }
        }
      }
    },
    skip,
    take: pageSize,
    orderBy: {
      createdAt: 'desc'
    }
  })

  const total = await prisma.product.count({
    where: {
      categories: {
        some: {
          categoryId: cateId
        }
      }
    }
  })

  return {
    productList: productSchema.array().parse(productList),
    total
  }
}

export async function getProductList({
  page = 1,
  pageSize = 10
}: Pick<GetProductListParams, 'page' | 'pageSize'>) {
  const skip = (page - 1) * pageSize
  const productList = await prisma.product.findMany({
    skip,
    take: pageSize,
    orderBy: {
      createdAt: 'desc'
    }
  })
  const total = await prisma.product.count()
  return {
    productList: productWithoutCategoriesSchema.array().parse(productList),
    total
  }
}