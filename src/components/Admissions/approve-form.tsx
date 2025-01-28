import { yupResolver } from '@hookform/resolvers/yup'
import useProcessDischarge, { Status } from '@services/discharges/process-discharge'
import { Button } from '@ui/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/ui/form'
import { Input } from '@ui/ui/input'
import { Loader2 } from 'lucide-react'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  walletAmount: Yup.string().matches(/^\d+$/, 'Invalid amount entered'),
  settleAmount: Yup.string().matches(/^\d+$/, 'Invalid amount entered')
})

type DischargeFormValues = Yup.InferType<typeof validationSchema>

const DischargeForm: FC<{ id: string; handleToggle: () => void }> = ({ id, handleToggle }) => {
  const form = useForm({
    defaultValues: {
      walletAmount: '',
      settleAmount: '0'
    },

    resolver: yupResolver(validationSchema)
  })

  const { mutate: process, isLoading, isSuccess, isError, reset } = useProcessDischarge()

  const onSubmit = (data: DischargeFormValues) => {
    process({
      id,
      walletAmount: parseInt(data.walletAmount || '0'),
      settleAmount: parseInt(data.settleAmount || '0'),
      status: Status.Approved
    })
  }

  useEffect(() => {
    if (isSuccess || isError) {
      handleToggle()
    }

    return () => {
      reset()
    }
  }, [isSuccess, isError, handleToggle, reset])

  return (
    <div className="flex w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex p-2 flex-col gap-2 w-full">
          <FormField
            control={form.control}
            name="walletAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount to deduct from wallet</FormLabel>
                <FormControl>
                  <Input placeholder="Amount in KES" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="settleAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount settled beyond wallet</FormLabel>
                <FormControl>
                  <Input placeholder="Amount in KES" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isLoading && <Loader2 className="animate-spin" />}
          <Button type="submit"> Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default DischargeForm
