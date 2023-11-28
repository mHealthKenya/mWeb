import Center from '@components/Shared/CenterVert'
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  TextFieldProps
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import useEditSchedule from '@services/schedules/edit'
import dayjs, { Dayjs } from 'dayjs'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useScheduler } from 'src/context/ScheduleContext'
import * as Yup from 'yup'

interface FormProps {
  title: string
  description: string
  status: string
  chvId: string | undefined
}

const formSchema = Yup.object().shape({
  title: Yup.string().required('Title cannot be empty'),
  description: Yup.string().required('description cannot be empty'),
  status: Yup.string().required('Status cannot be empty'),
  chvId: Yup.string().optional()
})

export interface MotherDetailsProps {
  biodata?: FacilityBioData
  userId?: string
  facilityId?: string
  user?: User
  chvs?: User[]
}

export interface FormScroll {
  formRef: any
  scrollToForm: () => void
}

const status = ['Scheduled', 'Follow_up', 'Completed', 'Closed']

const EditScheduleComponent: FC<{
  data: MotherDetailsProps
  handleToggle: () => void
}> = ({ data, handleToggle }) => {
  const { userId, facilityId, chvs } = data

  console.log({ userId })

  const [chv, setChv] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormProps>({
    resolver: yupResolver(formSchema),
    mode: 'onBlur'
  })

  const val = watch('status')

  useEffect(() => {
    if (val === 'Follow_up') {
      setChv(true)
    } else {
      setChv(false)
    }
  }, [val])

  const now = dayjs(new Date()).format('YYYY-MM-DDTHH:mm')

  const scheduler = useScheduler()

  const cvDate = scheduler?.schedule?.date
    ? dayjs(new Date(scheduler?.schedule?.date)).format('YYYY-MM-DDTHH:mm')
    : now

  const [date, setDate] = useState(dayjs(cvDate))

  const handleDateChange = (value: Dayjs) => {
    setDate(value)
  }

  const textFieldProps: TextFieldProps = {
    size: 'small',
    fullWidth: true,
    required: true
  }

  const { mutate, isLoading } = useEditSchedule(handleToggle)

  const onSubmit = (data: FormProps) => {
    if (chv) {
      mutate({
        ...data,
        id: scheduler?.schedule?.id || '',
        motherId: userId!!,
        facilityId: facilityId!!,
        date: date.toISOString(),
        chvId: data?.chvId
      })
    } else {
      mutate({
        ...data,
        id: scheduler?.schedule?.id || '',
        motherId: userId!!,
        facilityId: facilityId!!,
        date: date.toISOString()
      })
    }
  }

  return (
    <Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ minWidth: '580px' }}>
          <CardHeader
            title={`${scheduler?.schedule?.mother?.f_name} ${scheduler?.schedule?.mother?.l_name} `}
          />
          <CardContent>
            <Stack spacing={2}>
              <TextField
                label="Title"
                {...textFieldProps}
                {...register('title')}
                error={!!errors?.title?.message}
                defaultValue={scheduler?.schedule?.title}
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
                defaultValue={scheduler?.schedule?.description}
              />

              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Status"
                  size="small"
                  defaultValue={scheduler?.schedule?.status}
                  {...register('status')}
                  error={!!errors.status?.message}
                  inputProps={{ 'data-testid': 'role_input' }}>
                  {status.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {chv && (
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Select CHV</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select CHV"
                    size="small"
                    {...register('chvId')}
                    error={!!errors.chvId?.message}
                    defaultValue={scheduler?.schedule?.mother?.createdById}
                    inputProps={{ 'data-testid': 'role_input' }}>
                    {chvs?.map((item, index) => {
                      console.log(item)

                      return (
                        <MenuItem key={index} value={item.id}>
                          {`${item.f_name} ${item.l_name}`}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              )}

              <DateTimePicker
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
                {isLoading ? 'Editing ' : 'Edit Schedule'}
              </Button>
              <Button variant="contained" color="error" disabled={isLoading} onClick={handleToggle}>
                Cancel
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
      </form>
    </Center>
  )
}

export default EditScheduleComponent
