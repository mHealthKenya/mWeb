import { yupResolver } from '@hookform/resolvers/yup'
import useOtpRequest from '@services/auth/otp-request'
import { Button } from '@ui/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/ui/form'
import { Input } from '@ui/ui/input'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { Loader2 } from 'lucide-react'

export interface Reset {
  email: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^254[0-9]{9}$/

// Combined regex using the OR (|) operator
const combinedRegex = new RegExp(emailRegex.source + '|' + phoneRegex.source)

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(combinedRegex, 'Invalid email or phone number')
    .required('Email or phone is required')
})

const RequestReset = () => {
  const form = useForm<Reset>({
    defaultValues: {
      email: ''
    },

    resolver: yupResolver(validationSchema)
  })

  const { mutate: reset, isLoading } = useOtpRequest()

  const handleRequest = (data: Reset) => {
    reset(data)
  }
  return (
    <Card className="mx-auto p-4 w-[60%]">
      <CardHeader>
        <CardTitle className="text-xl">Reset Password</CardTitle>
        <CardDescription>Enter your email or phone number to reset your password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(handleRequest)}>
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              <div className="flex flex-row items-center justify-center">
                {' '}
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <span>Reset Password</span>
              </div>
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Remembered Password?{' '}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>

        <div className="mt-4 text-center text-sm">
          I have a code{' '}
          <Link href="/passwordreset/passwordreset" className="underline">
            Reset
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default RequestReset
