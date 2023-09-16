import CenterComponent from '@components/Shared/Center'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserByRole } from '@models/user-by-role'
import { Edit } from '@mui/icons-material'
import { Box, Button, Card, CardActions, CardContent, CardHeader, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import useEditUserBioData from '@services/users/editBioData'
import dayjs, { Dayjs } from 'dayjs'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface EditBioDataProps {
  height: string
  weight: string
  active: boolean
  age: string
  pregnancy_period: string
  facilityId: string  
  previous_pregnancies: string
}

const bioDataUpdateSchema = Yup.object().shape({
  height: Yup.string().required(),
  weight: Yup.string().required(),
  active: Yup.boolean().required(),
  age: Yup.string().required(),
  pregnancy_period: Yup.string().required('Pregnancy Period is required'),
  facilityId: Yup.string().required(),
  previous_pregnancies: Yup.string().required('Previous Pregnancies is required')
})

const EditBioDataComponent: FC<{
  bioDataUpdate: UserByRole | undefined
  handleToggle: () => void
}> = ({
  bioDataUpdate,
  handleToggle
 }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
    // reset
  } = useForm<EditBioDataProps>({
    resolver: yupResolver(bioDataUpdateSchema)
  })

  const [selectedMonthlyPeriod, setSelectedMonthlyPeriod] = useState<Dayjs | null>(
    dayjs(bioDataUpdate!.BioData[0].last_monthly_period)
  )
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState<Dayjs | null>(
    dayjs(bioDataUpdate!.BioData[0].expected_delivery_date)
  )
  const [selectedClinicVisit, setSelectedClinicVisit] = useState<Dayjs | null>(
    dayjs(bioDataUpdate!.BioData[0].last_clinic_visit)
  )

  const { mutate, isLoading } = useEditUserBioData(handleToggle)

  const onSubmit = (data: EditBioDataProps) => {
    mutate({
      userId: bioDataUpdate?.id || '',
      ...data
    })
  }

  return (
    <CenterComponent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ minWidth: 700 }}>
          <CardHeader title={`Edit Bio Data`} />
          <CardContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 2, width: '30ch' }
              }}
              noValidate
              autoComplete="off">
              <div>
                <TextField
                  label="Height"
                  type="number"
                  defaultValue={bioDataUpdate?.BioData[0].height}
                  {...register('height')}
                  required
                  helperText={errors?.height?.message}
                  error={!!errors?.height?.message}
                  inputProps={{ 'data-testid': 'height_input' }}
                />
                <TextField
                  label="Weight"
                  type="number"
                  defaultValue={bioDataUpdate?.BioData[0].weight}
                  {...register('weight')}
                  required
                  helperText={errors?.weight?.message}
                  error={!!errors.weight?.message}
                  inputProps={{ 'data-testid': 'weight_input' }}
                />
              </div>
              <div>
                <TextField
                  label="Active"
                  defaultValue={bioDataUpdate?.BioData[0].active}
                  {...register('active')}
                  required
                  helperText={errors?.active?.message}
                  error={!!errors.active?.message}
                  inputProps={{ 'data-testid': 'active_input' }}
                />
                <TextField
                  label="Age"
                  defaultValue={bioDataUpdate?.BioData[0].age}
                  type="number"
                  {...register('age')}
                  required
                  helperText={errors?.age?.message}
                  error={!!errors.age?.message}
                  inputProps={{ 'data-testid': 'age_input' }}
                />
              </div>
              <div>
                <DatePicker
                  label="Last Monthly Period"
                  value={selectedMonthlyPeriod}
                  defaultValue={dayjs(bioDataUpdate?.BioData[0].last_monthly_period)}
                  onChange={(last_monthly_period) =>
                    setSelectedMonthlyPeriod(last_monthly_period ? last_monthly_period : null)
                  }
                />

                <DatePicker
                  label="Expected Delivery date"
                  value={selectedDeliveryDate}
                  defaultValue={dayjs(bioDataUpdate?.BioData[0].expected_delivery_date)}
                  onChange={(expected_delivery_date) =>
                    setSelectedDeliveryDate(expected_delivery_date)
                  }
                />
              </div>
              <div>
                <TextField
                  label="Pregnancy Period"
                  defaultValue={bioDataUpdate?.BioData[0].pregnancy_period}
                  type="number"
                  {...register('pregnancy_period')}
                  required
                  helperText={errors?.pregnancy_period?.message}
                  error={!!errors.pregnancy_period?.message}
                  inputProps={{ 'data-testid': 'pregnancy_period_input' }}
                />

                <DatePicker
                  label="Last Clinic Visit"
                  value={selectedClinicVisit}
                  defaultValue={dayjs(bioDataUpdate?.BioData[0].last_clinic_visit)}
                  onChange={(last_clinic_visit) => setSelectedClinicVisit(last_clinic_visit)}
                />
              </div>
              <div>
                <TextField
                  label="Facility"
                  defaultValue={bioDataUpdate?.BioData[0].facilityId}
                  {...register('facilityId')}
                  required
                  helperText={errors?.facilityId?.message}
                  error={!!errors.facilityId?.message}
                  inputProps={{ 'data-testid': 'facilityId_input' }}
                />
                <TextField
                  label="Previous Pregnancies"
                  type="number"
                  defaultValue={bioDataUpdate?.BioData[0].previous_pregnancies}
                  {...register('previous_pregnancies')}
                  required
                  helperText={errors?.previous_pregnancies?.message}
                  error={!!errors.previous_pregnancies?.message}
                  inputProps={{ 'data-testid': 'previous_pregnancies_input' }}
                />
              </div>
            </Box>

            <CardActions>
              <Button
                variant="contained"
                color="success"
                type="submit"
                startIcon={<Edit />}
                disabled={isLoading}
                data-testid="submit_button">
                {isLoading ? 'Editing...' : 'Edit'}
              </Button>

              <Button variant="contained" color="error" onClick={handleToggle}>
                Close
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </form>
    </CenterComponent>
  )
}

export default EditBioDataComponent
