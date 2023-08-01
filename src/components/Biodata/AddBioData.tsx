import CenterComponent from '@components/Shared/Center'
import { yupResolver } from '@hookform/resolvers/yup'
import { AddBioData } from '@models/add-bio-data'
import { Add } from '@mui/icons-material'
import { Box, Button, Card, CardActions, CardContent, CardHeader, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useAddBioData from '@services/users/addBioData'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'


export interface AddBioDataProps {
  height: string
  weight: string
  active: boolean
  age: string
  last_clinic_visit: Date
  last_monthly_period: Date
  expected_delivery_date: Date
  pregnancy_period: string
  facilityId: string
  previous_pregnancies: string
}

const bioDateSchema = Yup.object().shape({
  height: Yup.string().required(),
  weight: Yup.string().required(),
  active: Yup.boolean().required(),
  age:Yup.string().required(),
  last_clinic_visit: Yup.date().required('Clinic Visit is required'),
  last_monthly_period: Yup.date().required('Last Moontthly period is required'),
  expected_delivery_date: Yup.date().required('Expected Delivery is required'),
  pregnancy_period: Yup.string().required('Pregnancy period is reqiured'),
  facilityId: Yup.string().optional(),
  previous_pregnancies: Yup.string().required('Previous pregnancies is required')
})

const AddBioDataComponent : FC<{ bioData: AddBioData | undefined; handleToggle: () => void }> = ({ bioData, handleToggle}) =>  {

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset
  } = useForm<AddBioDataProps>({ 
    resolver: yupResolver(bioDateSchema)
  })

  const { mutate, isLoading } = useAddBioData(handleToggle)

  const onSubmit = (data: AddBioDataProps) => {
    // mutate({
    //   id: '' + bioData?.id,
    //   ...data
    // })

    const item = {
      ...data,
      facilityId: data.facilityId === 'Mother' ? 'Mother' : data.facilityId
    }

    mutate(item)
  }
  
  const [selectedDate, setSelectedDate ] = useState(null)
  const [selectedDeliveryDate, setSelectedDeliveryDate ] = useState(null)
  const [selectedClinicVisit, setSelectedClinicVisit ] = useState(null)
  
  
  return (
    <CenterComponent>
      <form onSubmit={handleSubmit(onSubmit)}>

       <Card sx={{minWidth: 700}}>
      <CardHeader title={`Add Bio Data`} />
        <CardContent>
          
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          label="Height"
          id="outlined-size-small"
          placeholder='height'
          // size="small"
          {...register('height')}
          required
          helperText={errors?.height?.message}
          error={!!errors?.height?.message}
          inputProps={{ 'data-testid': 'height_input' }}
        />
        <TextField
          label="Weight"
          id="outlined-size-small"
          placeholder='Weight'
          // size="small"
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
          id="outlined-size-small"
          placeholder='Active'
          // size="small"
          {...register('active')}
          required
          helperText={errors?.active?.message}
          error={!!errors.active?.message}
          inputProps={{ 'data-testid': 'active_input' }}
        />
         <TextField
          label="Age"
          id="outlined-size-small"
          placeholder='Age'
          // size="small"
          type='number'
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
          value={selectedDate}
          onChange={(last_monthly_period) => setSelectedDate(last_monthly_period)}
          
        />
      
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Last Monthly Period"
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        renderInput={(props) =>  
          <TextField
            {...props}
            required
            helperText={errors?.last_monthly_period?.message}
            error={!!errors.last_monthly_period?.message}
            inputProps={{ 'data-testid': 'last_monthly_period_input' }}
          />
        }
      />
    </LocalizationProvider> */}

<       DatePicker
          label="Expected Delivery date"
          value={selectedDeliveryDate}
          onChange={(expected_delivery_date) => setSelectedDeliveryDate(expected_delivery_date)}
          
        />

        {/* <TextField
          label="Expected Delivery date"
          id="outlined-size-small"
          placeholder='Delivery date'
          // size="small"
          {...register('expected_delivery_date')}
          required
          helperText={errors?.expected_delivery_date?.message}
          error={!!errors.expected_delivery_date?.message}
          inputProps={{ 'data-testid': 'expected_delivery_date_input' }}
        /> */}
      </div>
      <div>
      <TextField
          label="Pregnancy Period"
          id="outlined-size-small"
          placeholder='Pregnancy Period'
          // size="small"
          type='number'
          {...register('pregnancy_period')}
          required
          helperText={errors?.pregnancy_period?.message}
          error={!!errors.pregnancy_period?.message}
          inputProps={{ 'data-testid': 'pregnancy_period_input' }}
        />

        <DatePicker
          label="Last Clinic Visit"
          value={selectedClinicVisit}
          onChange={(last_clinic_visit) => setSelectedClinicVisit(last_clinic_visit)}
          
        />


        {/* <TextField
          label="Last Clinic Visit"
          id="outlined-size-small"
          placeholder='Last Clinic Visit'
          // size="small"
          {...register('last_clinic_visit')}
          required
          helperText={errors?.last_clinic_visit?.message}
          error={!!errors.last_clinic_visit?.message}
          inputProps={{ 'data-testid': 'last_clinic_visit_input' }}
        /> */}
      </div>
      <div>
      <TextField
          label="Facility"
          id="outlined-size-small"
          placeholder='Facility'
          // size="small"
          {...register('facilityId')}
          required
          helperText={errors?.facilityId?.message}
          error={!!errors.facilityId?.message}
          inputProps={{ 'data-testid': 'facilityId_input' }}
        />
        <TextField
          label="Previous Pregnancies"
          id="outlined-size-small"
          type='number'
          placeholder='Previous Pregancies'
          // size="small"
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
      startIcon={<Add />}
      disabled={isLoading}
      data-testid="submit_button">
      {isLoading ? 'Adding...' : 'Add'}
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

export default AddBioDataComponent