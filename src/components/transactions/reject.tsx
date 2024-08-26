import CenterComponent from '@components/Shared/Center'
import { yupResolver } from '@hookform/resolvers/yup'
import { AllTransactionsType } from '@models/alltransactions'
import useReject from '@services/bills/reject'
import { Button } from '@ui/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@ui/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@ui/ui/form'
import { Textarea } from '@ui/ui/textarea'
import { useAtom } from 'jotai'
import { Loader2 } from 'lucide-react'
import { FC, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import rejectAtom from 'src/atoms/rejectatom'
import * as Yup from 'yup'

interface FormProps {
  reason: string
}

const billSchema = Yup.object().shape({
  reason: Yup.string().required()
})

const RejectTransaction: FC<{ data: AllTransactionsType }> = ({ data }) => {
  const form = useForm<FormProps>({
    resolver: yupResolver(billSchema),
    defaultValues: {
      reason: ''
    }
  })

  const [_, setOpen] = useAtom(rejectAtom)

  const handleClose = useCallback(() => {
    setOpen((open) => !open)
  }, [setOpen])

  const { mutate: reject, isLoading } = useReject()

  const handleSubmit = (form: FormProps) => {
    reject({
      id: data.id,
      reason: form.reason
    })
  }

  return (
    <CenterComponent>
      <Form {...form}>
        <form className="min-w-[600px]" onSubmit={form.handleSubmit(handleSubmit)}>
          <Card>
            <CardContent className="gap-y-2">
              <CardTitle className="my-4">{`Reject Transaction made for ${data?.user.f_name} ${data?.user.l_name}`}</CardTitle>
              <FormField
                name="reason"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Reject Reason" {...field} className="my-2" />
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
                  <span>Reject</span>
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

export default RejectTransaction
