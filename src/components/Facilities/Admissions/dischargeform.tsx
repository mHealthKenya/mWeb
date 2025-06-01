import { yupResolver } from '@hookform/resolvers/yup'
import useRequestDischarge from '@services/discharges/request'
import { Button } from '@ui/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/ui/form'
import { Input } from '@ui/ui/input'
import { Loader2 } from 'lucide-react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  attachment: Yup.mixed().required('Attachment is required')
})

type DischargeFormValues = Yup.InferType<typeof validationSchema>

const DischargeForm: FC<{ id: string }> = ({ id }) => {
  const form = useForm({
    defaultValues: {
      attachment: undefined
    },

    resolver: yupResolver(validationSchema)
  })

  const { mutate: request, isLoading } = useRequestDischarge()

  const onSubmit = (data: DischargeFormValues) => {
    const files: File[] = Array.from(data.attachment as FileList)

    request({ id, files })
  }

  return (
    <div className="flex w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex p-2 flex-col gap-2 w-full">
          <FormField
            control={form.control}
            name="attachment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Attach Discharge Summary</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Discharge Summary"
                    type="file"
                    multiple
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
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
