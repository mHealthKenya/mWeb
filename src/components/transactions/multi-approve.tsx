import { cn } from '@/lib/utils'
import { Button } from '@ui/ui/button'
import { Calendar } from '@ui/ui/calendar'
import { Card } from '@ui/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@ui/ui/popover'
import dayjs, { OpUnitType } from 'dayjs'
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react'
import React, { FC, useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/ui/form'
import { Facility } from '@models/facility'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/ui/select'
import useCheckPeriodPoints from '@services/bills/checkperiodpoints'
import { useAtom } from 'jotai'
import checkBalanceAtom from 'src/atoms/checkbalance'
import SharedModal from '@components/Shared/Modal'
import MultiApproveConfirm from './multi-approve-confirm'

export interface FormData {
  date: DateRange
  facilityId: string
}

const schema = Yup.object().shape({
  date: Yup.mixed<DateRange>().required(),
  facilityId: Yup.string().required("Facility can't be empty")
})

const MultiApproveComponent: FC<{ facilities: Facility[] }> = ({ facilities }) => {
  const [startDate, setStartDate] = useState(dayjs(new Date()).startOf('week').toDate())

  const [endDate, setEndDate] = useState(dayjs(new Date()).endOf('week').toDate())

  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      date: {
        from: startDate,
        to: endDate
      },

      facilityId: ''
    }
  })

  useEffect(() => {
    if (form.watch('date')) {
      const { from, to } = form.watch('date')

      if (from && to) {
        setStartDate(from)
        setEndDate(to)
      }
    }
  }, [form])

  const handlePeriod = (period: OpUnitType) => {
    form.setValue('date', {
      from: dayjs(new Date()).startOf(period).toDate(),
      to: dayjs(new Date()).endOf(period).toDate()
    })
  }

  const { mutate: check, isLoading } = useCheckPeriodPoints()

  const [balance, setBalance] = useAtom(checkBalanceAtom)

  const { open } = balance

  const handleToggle = () => {
    setBalance((balance) => ({
      ...balance,
      open: !balance.open
    }))
  }

  const handleSubmit = (data: FormData) => {
    check({
      startDate: data?.date?.from?.toISOString() || '',
      endDate: data?.date?.to?.toISOString() || '',
      facilityId: data.facilityId
    })
  }

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="flex flex-col gap-5 justify-center">
        <div className="flex flex-row py-2 gap-2">
          <Button asChild variant="ghost" onClick={() => handlePeriod('day')}>
            <Card className="px-2 py-1 text-sm cursor-pointer text-slate-800">Today</Card>
          </Button>

          <Button asChild variant="ghost" onClick={() => handlePeriod('week')}>
            <Card className="px2 py-1 text-sm cursor-pointer text-slate-800">This Week</Card>
          </Button>
          <Button asChild variant="ghost" onClick={() => handlePeriod('month')}>
            <Card className="px-2 py-1 text-sm cursor-pointer text-slate-800">This Month</Card>
          </Button>
        </div>
        <div>
          <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                name="date"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-sm">Custom Date Range</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={'outline'}
                          className={cn(
                            'w-[600px] justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value?.from ? (
                            field.value.to ? (
                              <>
                                {`${dayjs(field.value.from).format('MMM DD, YYYY')} - ${dayjs(
                                  field.value.to
                                ).format('MMM DD, YYYY')}`}
                              </>
                            ) : (
                              dayjs(field.value.from).format('MMM DD, YYYY')
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={field.value?.from}
                          selected={field.value}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="facilityId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Select Facility</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a facility" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {facilities.map((facility) => (
                          <SelectItem key={facility.id} value={facility.id}>
                            {facility.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} type="submit">
                <div className="flex flex-row items-center justify-center">
                  {' '}
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <span>Check Amount To Pay</span>
                </div>
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <SharedModal items={{ open: open, handleToggle }}>
        <MultiApproveConfirm
          data={{
            date: form.getValues('date'),
            facilityId: form.getValues('facilityId')
          }}
        />
      </SharedModal>
    </div>
  )
}

export default MultiApproveComponent
