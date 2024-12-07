import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, { message: '用户名不能为空' }),
  password: z.string().min(1, { message: '密码不能为空' }),
})

export type Login = z.infer<typeof loginSchema>
