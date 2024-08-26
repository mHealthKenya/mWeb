import { yupResolver } from '@hookform/resolvers/yup'
import { Contact } from '@models/emergency-contact'
import useAddEmergencyContact from '@services/emergency-contact/add'
import useFacilityEmergencyContact from '@services/emergency-contact/facility'
import { Button } from '@ui/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@ui/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/ui/form'
import { Input } from '@ui/ui/input'
import { Loader2 } from 'lucide-react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^254\d{9}$/, 'Invalid phone number format. Use this format 254xxxxxxxxx'),
  facilityId: Yup.string().required('Facility is required')
})
interface FormProps {
  facilityId: string
  phone: string
}

const EmergencyContactByFacility: FC<{ facilityId: string; contact: Contact | null }> = ({
  facilityId,
  contact
}) => {
  const { data } = useFacilityEmergencyContact({
    facilityId,
    contact
  })

  const form = useForm<FormProps>({
    defaultValues: {
      facilityId,
      phone: data?.phone || ''
    },
    resolver: yupResolver(schema)
  })

  const { mutate: add, isLoading } = useAddEmergencyContact()

  const handleSubmit = (data: FormProps) => {
    add(data)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card>
            <CardContent className="gap-y-2">
              <CardTitle className="my-4">Add or update facility emergency contact</CardTitle>
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-muted-foreground">Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Emergency phone number" {...field} className="my-2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                <div className="flex flex-row items-center justify-center">
                  {' '}
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <span>Submit</span>
                </div>
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}

export default EmergencyContactByFacility
