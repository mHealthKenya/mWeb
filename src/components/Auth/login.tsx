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
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <Form {...form}>
          <form className="mx-auto grid w-[350px] gap-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email or phone number below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email or Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com or 254712345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        {...field}
                        type={!show ? 'password' : 'text'}
                        Icon={
                          show ? (
                            <Eye
                              className="text-muted-foreground mr-2 cursor-pointer"
                              size={18}
                              onClick={handleToggle}
                            />
                          ) : (
                            <EyeOff
                              className="text-muted-foreground mr-2 cursor-pointer"
                              size={18}
                              onClick={handleToggle}
                            />
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                <div className="flex flex-row items-center justify-center">
                  {' '}
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <span>Login</span>
                </div>
              </Button>

              <Link
                href="/passwordreset/otp-request"
                className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
          </form>
        </Form>
      </div>
      <div className="hidden bg-muted lg:block ">
        <div className="flex flex-col h-full items-center justify-center">
          <Image
            src="/assets/brand/logo.png"
            alt="Image"
            width="400"
            height="400"
            className="object-fit dark:brightness-[0.2] dark:grayscale items-center justify-center mt-10 ml-10"
          />
        </div>
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
