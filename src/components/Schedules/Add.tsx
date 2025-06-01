import { yupResolver } from '@hookform/resolvers/yup'
import { FacilityBioData } from '@models/biodata'
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
import useAddSchedule from '@services/schedules/add'
import dayjs, { Dayjs } from 'dayjs'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

interface FormProps {
  title: string
  description: string
}

const formSchema = Yup.object().shape({
  title: Yup.string().required('Title cannot be empty'),
  description: Yup.string().required('description cannot be empty')
})

export interface MotherDetailsProps {
  biodata?: FacilityBioData
  userId?: string
  facilityId?: string
  user?: User
}

export interface FormScroll {
  formRef: any
  scrollToForm: () => void
}

const AddScheduleComponent: FC<{
  data: MotherDetailsProps
}> = ({ data }) => {
  const { userId, facilityId, user } = data

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormProps>({
    resolver: yupResolver(formSchema),
    mode: 'onBlur'
  })

  const now = dayjs(new Date()).format('YYYY-MM-DDTHH:mm')

  const [date, setDate] = useState(dayjs(now))

  const handleDateChange = (value: Dayjs) => {
    setDate(value)
  }

  const textFieldProps: TextFieldProps = {
    size: 'small',
    fullWidth: true,
    required: true
  }

  const { mutate, isLoading } = useAddSchedule(reset)

  const onSubmit = (data: FormProps) => {
    mutate({
      ...data,
      motherId: userId!!,
      facilityId: facilityId!!,
      date: date.toISOString()
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader title={`${user?.f_name} ${user?.l_name} `} />
        <CardContent>
          <Stack spacing={2}>
            <TextField
              label="Title"
              {...textFieldProps}
              {...register('title')}
              error={!!errors?.title?.message}
              helperText={errors?.title?.message}
            />
            <TextField
              label="Description"
              {...textFieldProps}
              {...register('description')}
              error={!!errors?.description?.message}
              helperText={errors?.description?.message}
              multiline
              rows={2}
            />

            <DateTimePicker
              minDate={dayjs(new Date())}
              format="YYYY-MM-DD HH:mm"
              label="Date of Visit"
              onChange={(i) => handleDateChange(i!)}
              slotProps={{ textField: { size: 'small', required: true } }}
              value={date}
            />
          </Stack>
        </CardContent>
        <CardActionArea>
          <CardActions>
            <Button variant="contained" color="success" type="submit" disabled={isLoading}>
              {isLoading ? 'Adding ' : 'Add Schedule'}
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </form>
  )
}

export default AddScheduleComponent
