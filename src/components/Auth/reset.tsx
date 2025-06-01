import { yupResolver } from '@hookform/resolvers/yup'
import usePasswordReset from '@services/auth/password-reset'
import { Button } from '@ui/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/ui/form'
import { Input } from '@ui/ui/input'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface PasswordReset {
  code: string
  password: string
  passwordConfirmation?: string
}

const validationSchema = Yup.object().shape({
  code: Yup.string().required(),
  password: Yup.string().required().min(4, 'Password must be at least 4 characters'),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match')
})

const PasswordResetComponent = () => {
  const form = useForm<PasswordReset>({
    defaultValues: {
      code: '',
      password: '',
      passwordConfirmation: ''
    },

    resolver: yupResolver(validationSchema)
  })

  const { mutate: reset, isLoading } = usePasswordReset()

  const handleRequest = (data: PasswordReset) => {
    reset(data)
  }

  const [show, setShow] = useState(false)

  const handleToggle = () => {
    setShow(!show)
  }
  return (
    <Card className="mx-auto p-4 w-[60%]">
      <CardHeader>
        <CardTitle className="text-xl">Reset Password</CardTitle>
        <CardDescription>Enter your code and new password to reset your password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(handleRequest)}>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="123456" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter new password"
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

            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter new password again"
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
      </CardContent>
    </Card>
  )
}

export default PasswordResetComponent
