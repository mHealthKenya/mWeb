import { yupResolver } from '@hookform/resolvers/yup'
import { ClinicalVisit } from '@models/clinicvisits'
import { UserByRole } from '@models/user-by-role'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField
} from '@mui/material'
import useAddVisit from '@services/visits/add'
import { FC, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import { BiodataUser } from '@models/biodatauser'

interface FormProps {
  weight: string
  hiv: string
  hbLevel: string
  bloodGroup: string
  rhesusFactor: string
  urinalysis: string
  vdrl: string
  bloodRBS: string
  hepatitisB: string
  notes: string
  TB: string
}

const validationSchema = Yup.object().shape({
  weight: Yup.string().required(),
  hiv: Yup.string().required(),
  hbLevel: Yup.string().required(),
  bloodGroup: Yup.string().required(),
  rhesusFactor: Yup.string().required(),
  urinalysis: Yup.string().required(),
  vdrl: Yup.string().required(),
  bloodRBS: Yup.string().required(),
  hepatitisB: Yup.string().required(),
  notes: Yup.string().required(),
  TB: Yup.string().required()
})

const status = ['positive', 'negative']

const hiv = ['reactive', 'non reactive']
const groups = ['A', 'B', 'AB', 'Ø']

const AddVisitComponent: FC<{
  facilityAdmin: UserByRole
  clinicVisit: ClinicalVisit | null
  admin: boolean
  bioDataId: string
  userDetails: BiodataUser
}> = ({ facilityAdmin, clinicVisit, admin, bioDataId, userDetails }) => {
  const now = dayjs(new Date()).format('YYYY-MM-DDTHH:mm')

  const [date, setDate] = useState(dayjs(now))

  const handleDateChange = (value: Dayjs) => {
    setDate(value)
  }

  const [period, setPeriod] = useState('')

  useEffect(() => {
    const diff = new Date().getTime() - new Date(userDetails?.last_monthly_period || '').getTime()

    const actualDiff = Math.floor(diff / (1000 * 60 * 60 * 24 * 7))

    setPeriod('' + actualDiff)
  }, [userDetails?.last_monthly_period])

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<FormProps>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange'
  })

  const { mutate, isLoading } = useAddVisit(admin)

  const onSubmit = (data: FormProps) => {
    mutate({
      ...data,
      bioDataId,
      facilityId: facilityAdmin.facilityId || '',
      date: date.toISOString()
    })
  }

  const titleString = `Record clinic visit for ${userDetails?.user.f_name} ${userDetails?.user.l_name}`

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader title={titleString} />
          <CardContent>
            <Stack spacing={1}>
              <TextField
                fullWidth
                size="small"
                label="Gestation Period In Weeks"
                required
                defaultValue={period}
                value={period}
                disabled
              />
              <TextField
                fullWidth
                size="small"
                label="Weight"
                required
                {...register('weight')}
                defaultValue={clinicVisit?.weight}
              />
              <Controller
                rules={{ required: 'Please select an option' }}
                name="hiv"
                control={control}
                defaultValue={clinicVisit?.hiv || ''}
                render={({ field }) => (
                  <>
                    <FormLabel required error={!!errors?.hiv?.message}>
                      HIV
                    </FormLabel>
                    <RadioGroup {...field} row>
                      {hiv.map((state, index) => (
                        <FormControlLabel
                          value={state}
                          control={<Radio />}
                          label={state}
                          key={index}
                        />
                      ))}
                    </RadioGroup>
                  </>
                )}
              />

              <TextField
                fullWidth
                size="small"
                label="HB Level"
                {...register('hbLevel')}
                defaultValue={clinicVisit?.hbLevel}
                error={!!errors?.hbLevel?.message}
                helperText={errors?.hbLevel?.message}
              />

              <Controller
                name="bloodGroup"
                control={control}
                defaultValue={clinicVisit?.bloodGroup}
                render={({ field }) => (
                  <>
                    <FormLabel required error={!!errors?.bloodGroup?.message}>
                      Blood Group
                    </FormLabel>
                    <RadioGroup {...field} row>
                      {groups.map((state, index) => (
                        <FormControlLabel
                          value={state}
                          control={<Radio />}
                          label={state}
                          key={index}
                        />
                      ))}
                    </RadioGroup>
                  </>
                )}
              />

              <Controller
                name="rhesusFactor"
                control={control}
                defaultValue={clinicVisit?.rhesusFactor}
                render={({ field }) => (
                  <>
                    <FormLabel required error={!!errors?.rhesusFactor?.message}>
                      Rhesus Factor
                    </FormLabel>
                    <RadioGroup {...field} row>
                      {status.map((state, index) => (
                        <FormControlLabel
                          value={state}
                          control={<Radio />}
                          label={state}
                          key={index}
                        />
                      ))}
                    </RadioGroup>
                  </>
                )}
              />

              <TextField
                fullWidth
                size="small"
                label="Urinalysis"
                rows={4}
                multiline
                defaultValue={clinicVisit?.urinalysis}
                error={!!errors?.urinalysis?.message}
                helperText={errors?.urinalysis?.message}
                {...register('urinalysis')}
              />
              <TextField
                fullWidth
                size="small"
                label="VDRL"
                {...register('vdrl')}
                defaultValue={clinicVisit?.vdrl}
                error={!!errors?.vdrl?.message}
                helperText={errors?.vdrl?.message}
              />
              <TextField
                fullWidth
                size="small"
                label="Blood RBS"
                {...register('bloodRBS')}
                defaultValue={clinicVisit?.bloodRBS}
                error={!!errors?.bloodRBS?.message}
                helperText={errors?.bloodRBS?.message}
              />
              <Controller
                name="hepatitisB"
                control={control}
                defaultValue={clinicVisit?.hepatitisB}
                render={({ field }) => (
                  <>
                    <FormLabel required error={!!errors?.hepatitisB?.message}>
                      Hepatitis B
                    </FormLabel>
                    <RadioGroup {...field} row>
                      {[...status, 'Not tested'].map((state, index) => (
                        <FormControlLabel
                          value={state}
                          control={<Radio />}
                          label={state}
                          key={index}
                        />
                      ))}
                    </RadioGroup>
                  </>
                )}
              />

              <Controller
                name="TB"
                control={control}
                defaultValue={clinicVisit?.TB || ''}
                render={({ field }) => (
                  <>
                    <FormLabel required error={!!errors?.TB?.message}>
                      TB
                    </FormLabel>
                    <RadioGroup {...field} row>
                      {[...status, 'Not tested'].map((state, index) => (
                        <FormControlLabel
                          value={state}
                          control={<Radio />}
                          label={state}
                          key={index}
                        />
                      ))}
                    </RadioGroup>
                  </>
                )}
              />

              <DateTimePicker
                maxDate={dayjs(new Date())}
                format="YYYY-MM-DD HH:mm"
                label="Date and Time of Visit"
                onChange={(i) => handleDateChange(i!)}
                slotProps={{ textField: { size: 'small' } }}
                value={date}
              />

              <TextField
                fullWidth
                size="small"
                label="Notes"
                rows={4}
                multiline
                defaultValue={clinicVisit?.notes}
                error={!!errors?.notes?.message}
                helperText={errors?.notes?.message}
                {...register('notes')}
              />
            </Stack>
          </CardContent>
          <CardActionArea>
            <CardActions>
              <Button variant="contained" color="success" type="submit">
                {isLoading ? 'Recording' : 'Record'}
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
      </form>
    </LocalizationProvider>
  )
}

export default AddVisitComponent
