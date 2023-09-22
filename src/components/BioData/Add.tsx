import { yupResolver } from '@hookform/resolvers/yup'
import { FacilityBioData } from '@models/biodata'
import { UserSchedule } from '@models/schedules'
import { User } from '@models/user'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  TextFieldProps
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import useAddBioData from '@services/biodata/add-biodata'
import useGetBioData from '@services/biodata/get'
import dayjs, { Dayjs } from 'dayjs'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

interface FormProps {
  height: number
  weight: number
  age: number
}

const formSchema = Yup.object().shape({
  height: Yup.number().required('Height cannot be empty').min(56),
  weight: Yup.number().required('Weight cannot be empty').min(20),
  age: Yup.number().required('Age cannot be empty').min(10)
})

export interface MotherDetailsProps {
  biodata?: FacilityBioData
  userId?: string
  facilityId?: string
  schedules?: UserSchedule[]
  user?: User
}

const AddBiodata: FC<{ data: MotherDetailsProps }> = ({ data }) => {
  const { biodata, userId, facilityId, user } = data
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormProps>({
    resolver: yupResolver(formSchema),
    mode: 'onBlur'
  })

  const now = dayjs(new Date()).format('YYYY-MM-DDTHH:mm')

  const eddDate = biodata?.expected_delivery_date
    ? dayjs(new Date(biodata?.expected_delivery_date)).format('YYYY-MM-DDTHH:mm')
    : now
  const lmpDate = biodata?.last_monthly_period
    ? dayjs(new Date(biodata?.last_monthly_period)).format('YYYY-MM-DDTHH:mm')
    : now
  const lcvDate = biodata?.last_clinic_visit
    ? dayjs(new Date(biodata?.last_clinic_visit)).format('YYYY-MM-DDTHH:mm')
    : now

  const [date, setDate] = useState(dayjs(lcvDate))

  const handleDateChange = (value: Dayjs) => {
    setDate(value)
  }

  const [edd, setEdd] = useState(dayjs(eddDate))

  const handleEddChange = (value: Dayjs) => {
    setEdd(value)
  }

  const [lmp, setLmp] = useState(dayjs(lmpDate))

  const handleLMPChange = (value: Dayjs) => {
    setLmp(value)
  }

  const textFieldProps: TextFieldProps = {
    size: 'small',
    fullWidth: true,
    required: true
  }

  const [period, setPeriod] = useState('')

  useEffect(() => {
    const diff = new Date().getTime() - new Date(lmp.toISOString()).getTime()

    const actualDiff = Math.floor(diff / (1000 * 60 * 60 * 24 * 7))

    setPeriod('' + actualDiff)
  }, [lmp])

  const { mutate, isLoading } = useAddBioData()
  const { data: bio, isLoading: loadingBio } = useGetBioData(biodata!!, userId!!)

  const onSubmit = (data: FormProps) => {
    mutate({
      age: '' + data.age,
      height: '' + data.height,
      weight: '' + data.weight,
      expected_delivery_date: new Date(edd.toISOString()),
      last_monthly_period: new Date(lmp.toISOString()),
      last_clinic_visit: new Date(date.toISOString()),
      pregnancy_period: period,
      userId: userId || '',
      facilityId: facilityId || ''
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader title={`${user?.f_name} ${user?.l_name} `} />
        <CardContent>
          <Stack spacing={2}>
            <TextField
              type="number"
              label="Height in Centimeters"
              {...textFieldProps}
              defaultValue={biodata?.height}
              {...register('height')}
              error={!!errors?.height?.message}
              helperText={errors?.height?.message}
            />
            <TextField
              type="number"
              label="Weight in Kg"
              {...textFieldProps}
              defaultValue={biodata?.weight}
              {...register('weight')}
              error={!!errors?.weight?.message}
              helperText={errors?.weight?.message}
            />
            <TextField
              type="number"
              label="Age in Years"
              {...textFieldProps}
              defaultValue={biodata?.age}
              {...register('age')}
              error={!!errors?.age?.message}
              helperText={errors?.age?.message}
            />
            <DateTimePicker
              label="Last Clinic Visit"
              onChange={(i) => handleDateChange(i!)}
              slotProps={{ textField: { size: 'small', required: true } }}
              value={date}
            />

            <DateTimePicker
              label="Last Monthly Period"
              onChange={(i) => handleLMPChange(i!)}
              slotProps={{ textField: { size: 'small', required: true } }}
              value={lmp}
            />

            <TextField
              type="number"
              label="Pregnancy Period In Weeks"
              {...textFieldProps}
              defaultValue={period}
              value={period}
              disabled
            />

            <DateTimePicker
              label="Expected Delivery Date"
              onChange={(i) => handleEddChange(i!)}
              slotProps={{ textField: { size: 'small', required: true } }}
              value={edd}
            />
          </Stack>
        </CardContent>
        <CardActionArea>
          <CardActions>
            <Button
              variant="contained"
              color={bio?.message ? 'success' : 'info'}
              type="submit"
              disabled={isLoading}>
              {isLoading
                ? 'Loading...'
                : bio?.message
                ? 'Add Bio Data'
                : loadingBio
                ? 'Saving Bio Data'
                : 'Edit Bio Data'}
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </form>
  )
}

export default AddBiodata
