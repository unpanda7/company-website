"use server"
import { prisma } from "@/lib/prisma"
import { loginSchema } from "@/lib/validations/auth"
import { getSession } from "@/lib/session"

export async function login(data: FormData) {
  const validationResult = loginSchema.safeParse({
    username: data.get("username"),
    password: data.get("password"),
  })

  if (!validationResult.success) {
    return {
      error: validationResult.error.flatten().fieldErrors,
    }
  }

  const { username, password } = validationResult.data

  const user = await prisma.user.findFirst({
    where: {
      username,
      password
    }
  })

  if (!user) {
    return {
      error: {
        username: "用户名或密码错误",
      },
    }
  }

  const session = await getSession()
  session.user = {
    id: user.id,
    username: user.username,
    isLoggedIn: true,
  }

  await session.save()

  return {
    success: true,
    user
  }
}


export async function logout() {
  const session = await getSession()
  session.destroy()
  return {
    success: true,
  }
}
