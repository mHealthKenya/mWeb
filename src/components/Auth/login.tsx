import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@ui/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/ui/form'
import { Input } from '@ui/ui/input'
import * as jwt from 'jsonwebtoken'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import nookies from 'nookies'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useLogin from 'src/services/auth/login'
import * as Yup from 'yup'

export interface LoginCredentials {
  email: string
  password: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^254[0-9]{9}$/

// Combined regex using the OR (|) operator
const combinedRegex = new RegExp(emailRegex.source + '|' + phoneRegex.source)

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(combinedRegex, 'Invalid email or phone number')
    .required('Email or phone is required'),
  password: Yup.string().required('Password is required')
})

const LoginComponent = () => {
  const form = useForm<LoginCredentials>({
    defaultValues: {
      email: '',
      password: ''
    },

    resolver: yupResolver(validationSchema)
  })

  const { mutate: login, isLoading } = useLogin()

  const onSubmit = (credentials: LoginCredentials) => {
    // console.log(credentials)
    login(credentials)
  }

  const [show, setShow] = useState(false)

  const handleToggle = () => {
    setShow(!show)
  }

  return (
    <div className="w-full min-h-screen grid lg:grid-cols-2">
      {/* Left - Login Form */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-background rounded-xl shadow-lg p-10">
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Title */}
              <div className="text-center space-y-3">
                <h1 className="text-4xl font-bold tracking-tight">Login</h1>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Enter your email or phone number below to login to your account
                </p>
              </div>

              {/* Fields */}
              <div className="space-y-6">
                {/* Email / Phone */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email or Phone</FormLabel>
                      <FormControl>
                        <Input
                          className="h-11 rounded-md focus:ring-2 focus:ring-primary"
                          placeholder="m@example.com or 254712345678"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            className="h-11 rounded-md pr-10 focus:ring-2 focus:ring-primary"
                            placeholder="Enter your password"
                            {...field}
                            type={!show ? 'password' : 'text'}
                          />
                        </FormControl>
                        <span
                          onClick={handleToggle}
                          className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-muted-foreground hover:text-foreground">
                          {show ? <Eye size={18} /> : <EyeOff size={18} />}
                        </span>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Button */}
                <Button type="submit" className="w-full h-11 rounded-md" disabled={isLoading}>
                  <div className="flex items-center justify-center">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <span>Login</span>
                  </div>
                </Button>

                {/* Forgot password */}
                <div className="text-right">
                  <Link
                    href="/passwordreset/otp-request"
                    className="text-xs text-muted-foreground hover:underline">
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Right - Logo */}
      <div className="hidden lg:flex items-center justify-center bg-muted">
        <Image
          src="/assets/brand/logo.png"
          alt="Image"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>
    </div>
  )
}

export default LoginComponent

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  } catch (error) {
    return {
      props: {
        data: 'Success login'
      }
    }
  }
}
