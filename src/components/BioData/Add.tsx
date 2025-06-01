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
import { DatePicker } from '@mui/x-date-pickers'
import useAddBioData from '@services/biodata/add-biodata'
import useGetBioData from '@services/biodata/get'
import dayjs, { Dayjs } from 'dayjs'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

interface FormProps {
  height?: string
  weight?: string
  age: number
  parity?: string
  gravidity?: string
}

const formSchema = Yup.object().shape({
  height: Yup.string(),
  weight: Yup.string(),
  age: Yup.number().required('Age cannot be empty').min(10),
  parity: Yup.string(),
  gravidity: Yup.string()
})

export interface MotherDetailsProps {
  biodata?: FacilityBioData
  userId?: string
  facilityId?: string
  schedules?: UserSchedule[]
  user?: User
  chvs: User[]
}

const AddBiodata: FC<{ data: MotherDetailsProps }> = ({ data }) => {
  const { biodata, userId, facilityId, user } = data
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormProps>({
    resolver: yupResolver(formSchema)
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

  const optionalFieldProps: TextFieldProps = {
    size: 'small',
    fullWidth: true
  }

  const [period, setPeriod] = useState('')

  useEffect(() => {
    const diff = new Date().getTime() - new Date(lmp ? lmp.toISOString() : new Date()).getTime()

    const actualDiff = Math.floor(diff / (1000 * 60 * 60 * 24 * 7))

    setPeriod('' + actualDiff)
  }, [lmp])

  const { data: bio, isLoading: loadingBio } = useGetBioData(biodata!!, userId!!)

  const { mutate, isLoading } = useAddBioData()

  const onSubmit = (data: FormProps) => {
    const main_data = {
      age: '' + data.age,
      last_clinic_visit: new Date(date.toISOString()),
      userId: userId || '',
      facilityId: facilityId || ''
    }

    const optional_data = {
      ...(data?.height ? { height: data.height } : {}),
      ...(data?.weight ? { weight: data.weight } : {}),
      ...(edd ? { expected_delivery_date: new Date(edd.toISOString()) } : {}),
      ...(lmp ? { last_monthly_period: new Date(lmp.toISOString()) } : {}),
      ...(period ? { pregnancy_period: period } : {}),
      ...(data?.parity ? { parity: data.parity } : {}),
      ...(data?.gravidity ? { gravidity: +data.gravidity } : {})
    }

    const full = { ...main_data, ...optional_data }

    mutate(full)
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
              {...optionalFieldProps}
              defaultValue={bio?.height}
              {...register('height')}
              error={!!errors?.height?.message}
              helperText={errors?.height?.message}
            />
            <TextField
              type="number"
              label="Weight in Kg"
              {...optionalFieldProps}
              defaultValue={bio?.weight}
              {...register('weight')}
              error={!!errors?.weight?.message}
              helperText={errors?.weight?.message}
            />
            <TextField
              type="number"
              label="Age in Years"
              {...textFieldProps}
              defaultValue={bio?.age}
              {...register('age')}
              error={!!errors?.age?.message}
              helperText={errors?.age?.message}
            />

            <TextField
              type="text"
              label="Parity"
              {...optionalFieldProps}
              defaultValue={bio?.parity}
              {...register('parity')}
              error={!!errors?.parity?.message}
              helperText={errors?.parity?.message}
            />

            <TextField
              type="number"
              label="Gravida"
              {...optionalFieldProps}
              defaultValue={bio?.gravidity}
              {...register('gravidity')}
              error={!!errors?.gravidity?.message}
              helperText={errors?.gravidity?.message}
            />
            <DatePicker
              label="Last Clinic Visit"
              format="YYYY-MM-DD"
              onChange={(i) => handleDateChange(i!)}
              slotProps={{ textField: { size: 'small', required: true } }}
              value={date}
            />

            <DatePicker
              label="Last Monthly Period"
              format="YYYY-MM-DD"
              onChange={(i) => handleLMPChange(i!)}
              slotProps={{ textField: { size: 'small' } }}
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

            <DatePicker
              label="Expected Delivery Date"
              format="YYYY-MM-DD"
              onChange={(i) => handleEddChange(i!)}
              slotProps={{ textField: { size: 'small' } }}
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
