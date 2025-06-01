import CenterComponent from '@components/Shared/Center'
import { yupResolver } from '@hookform/resolvers/yup'
import useTransact, { Transact } from '@services/bills/transact'
import { Button } from '@ui/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@ui/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@ui/ui/form'
import { Input } from '@ui/ui/input'
import { useAtom } from 'jotai'
import { Loader2 } from 'lucide-react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import billOpenAtom, { billAtom } from 'src/atoms/bill-open'
import * as Yup from 'yup'

interface FormProps {
  code: string
  points: string
}

const billSchema = Yup.object().shape({
  code: Yup.string()
    .required()
    .min(6, { message: 'Invalid code' })
    .max(6, { message: 'Invalid code' }),

  points: Yup.string()
    .required()
    .matches(/^(?!0$)(?!0\.0*$)\d+(\.\d+)?$/, {
      message: 'Invalid points'
    })
})

const BillSheet = () => {
  const form = useForm({
    resolver: yupResolver(billSchema),
    defaultValues: {
      code: '',
      points: ''
    }
  })

  const [_, setOpen] = useAtom(billOpenAtom)
  const [bill, __] = useAtom(billAtom)

  const handleClose = useCallback(() => {
    setOpen((open) => !open)
  }, [setOpen])

  const { mutate: transact, isLoading } = useTransact()

  const handleSubmit = (data: FormProps) => {
    const item: Transact = {
      ...data,
      userId: bill?.bioData?.user?.id || '',
      clinicVisitId: bill?.id || ''
    }

    transact(item)
  }

  return (
    <CenterComponent>
      <Form {...form}>
        <form className="min-w-[600px]" onSubmit={form.handleSubmit(handleSubmit)}>
          <Card>
            <CardContent className="gap-y-2">
              <CardTitle className="my-4">{`Send bill for ${bill?.bioData?.user?.f_name} ${bill?.bioData?.user?.l_name}`}</CardTitle>
              <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="code" {...field} className="my-2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="points"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Points Used" {...field} className="my-2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button type="submit" disabled={isLoading}>
                <div className="flex flex-row items-center justify-center">
                  {' '}
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <span>Send Bill</span>
                </div>
              </Button>
              <Button variant="destructive" onClick={handleClose}>
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </CenterComponent>
  )
}

export default BillSheet
