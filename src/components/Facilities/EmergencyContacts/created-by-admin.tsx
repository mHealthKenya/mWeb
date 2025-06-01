import React, { FC } from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/ui/form'
import { Card, CardContent, CardFooter, CardTitle } from '@ui/ui/card'
import { Facility } from '@models/facility'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/ui/select'
import { Input } from '@ui/ui/input'
import { Button } from '@ui/ui/button'
import useAddEmergencyContact from '@services/emergency-contact/add'
import { Loader2 } from 'lucide-react'

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

const EmergencyContactByAdmin: FC<{ facilities: Facility[] }> = ({ facilities }) => {
  const form = useForm<FormProps>({
    defaultValues: {
      facilityId: '',
      phone: ''
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
              <CardTitle className="my-4">Add or update facility emergency contacts</CardTitle>
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
              <FormField
                name="facilityId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-muted-foreground">Facility</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a facility" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {facilities.map((facility) => (
                          <SelectItem key={facility.id} value={facility.id}>
                            {facility?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

export default EmergencyContactByAdmin
