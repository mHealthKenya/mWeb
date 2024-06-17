import { WalletBase } from '@models/walletbase'
import { Card, CardContent, CardTitle } from '@ui/ui/card'
import React, { FC } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/ui/form'
import { Input } from '@ui/ui/input'
import { Button } from '@ui/ui/button'
import { Loader2 } from 'lucide-react'
import useBase from '@services/bills/wallet-base'

interface FormProps {
  points: string
}

const schema = Yup.object().shape({
  points: Yup.string()
    .required('Points is required')
    .matches(/^[1-9]\d*$/, 'Points must be a positive number')
})

const BaseComponent: FC<{ base: WalletBase | null }> = ({ base }) => {
  const form = useForm<FormProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      points: base?.points ? '' + base?.points : '6000'
    }
  })

  const { mutate, isLoading } = useBase()

  const handleSubmit = (data: FormProps) => {
    mutate(data)
  }

  return (
    <div className="flex flex-1 items-center justify-center ">
      <Card className="min-w-[600px]">
        <CardContent>
          <CardTitle title="Manage Wallet Base" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="points"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Points</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter points" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-3" disabled={isLoading}>
                <div className="flex flex-row items-center justify-center">
                  {' '}
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <span>Save</span>
                </div>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default BaseComponent
