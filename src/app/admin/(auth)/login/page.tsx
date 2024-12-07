"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/app/_actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Icons } from "@/components/icons"

interface FormError {
  username?: string[]
  password?: string[]
}

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<FormError | null>(null)
  const [generalError, setGeneralError] = useState<string | null>(null)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    setGeneralError(null)

    try {
      const formData = new FormData(event.currentTarget)
      const response = await login(formData)

      if (response.error) {
        console.log(response.error)
        setError(response.error as FormError)
        return
      }

      if (response.success) {
        // 登录成功，重定向到仪表盘
      window.location.href = '/admin/dashboard'
      }
    } catch (err) {
      setGeneralError('登录过程中发生错误，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">管理后台登录</CardTitle>
          <CardDescription className="text-center">
            请输入您的账号和密码
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            {generalError && (
              <div className="text-sm text-red-500 text-center">
                {generalError}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">用户名</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="请输入用户名"
                required
                disabled={isLoading}
                aria-describedby="username-error"
              />
              {error?.username && (
                <p id="username-error" className="text-sm text-red-500">
                  {error.username}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="请输入密码"
                required
                disabled={isLoading}
                aria-describedby="password-error"
              />
              {error?.password && (
                <p id="password-error" className="text-sm text-red-500">
                  {error.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              登录
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}