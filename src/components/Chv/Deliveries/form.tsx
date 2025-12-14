import { useForm } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/ui/card'
import { Checkbox } from '@ui/ui/checkbox'
import { Label } from '@ui/ui/label'
import { Textarea } from '@ui/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/ui/select'
import { Button } from '@ui/ui/button'
import useAddDelivery from '@services/delivery-status/add'
import { BiodataUser } from '@models/biodatauser'

type DeliveryData = {
  delivered: boolean
  comments: string
  deliveryMethod: string
}

export function DeliveryForm({ bioData }: { bioData: BiodataUser }) {
  const { mutate, isLoading } = useAddDelivery()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<DeliveryData>({
    defaultValues: {
      delivered: bioData.delivered,
      comments: '',
      deliveryMethod: bioData?.deliveryMethod || ''
    }
  })

  const deliveryMethod = watch('deliveryMethod')
  const delivered = watch('delivered')

  const onSubmit = async (data: DeliveryData) => {
    mutate({
      id: bioData.id,
      ...data
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Add Delivery Information</CardTitle>
        <CardDescription>
          Enter the details about the delivery. All fields marked with * are required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Delivery Method */}
            <div className="space-y-2">
              <Label htmlFor="deliveryMethod" className="text-sm font-semibold">
                Delivery Method <span className="text-destructive">*</span>
              </Label>
              <Select
                value={deliveryMethod}
                onValueChange={(value) =>
                  setValue('deliveryMethod', value, { shouldValidate: true })
                }>
                <SelectTrigger id="deliveryMethod" className="h-12">
                  <SelectValue placeholder="Select delivery method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Natural">Natural</SelectItem>
                  <SelectItem value="C-Section">C-Section</SelectItem>
                  <SelectItem value="Assisted">Assisted Delivery</SelectItem>
                  <SelectItem value="Water Birth">Water Birth</SelectItem>
                </SelectContent>
              </Select>
              {!deliveryMethod && errors.deliveryMethod && (
                <p className="text-sm text-destructive">{errors.deliveryMethod.message}</p>
              )}
            </div>

            {/* Delivered Status */}
            <div className="flex items-start space-x-3 rounded-lg border border-border bg-muted/30 p-4">
              <Checkbox
                id="delivered"
                checked={delivered}
                onCheckedChange={(checked) => setValue('delivered', checked === true)}
                className="mt-0.5"
              />
              <div className="space-y-1">
                <Label
                  htmlFor="delivered"
                  className="text-sm font-semibold leading-none cursor-pointer">
                  Mark as Delivered
                </Label>
                <p className="text-sm text-muted-foreground">
                  Check this box if the delivery has been completed
                </p>
              </div>
            </div>

            {/* Comments */}
            <div className="space-y-2">
              <Label htmlFor="comments" className="text-sm font-semibold">
                Comments or Notes
              </Label>
              <Textarea
                id="comments"
                placeholder="Enter any additional comments or observations about the delivery..."
                {...register('comments')}
                className="min-h-32 resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Optional: Add any relevant details or observations
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              className="flex-1 h-12 text-base font-semibold"
              disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Delivery Information'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-12 px-6 bg-transparent"
              onClick={() => reset()}
              disabled={isLoading}>
              Clear
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
