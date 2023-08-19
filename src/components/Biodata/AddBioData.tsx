import CenterComponent from '@components/Shared/Center'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserByRole } from '@models/user-by-role'
import { Add } from '@mui/icons-material'
import { Box, Button, Card, CardActions, CardContent, CardHeader, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useAddBioData from '@services/users/addBioData'
import { Dayjs } from 'dayjs'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface AddBioDataFormProps {
  height: string
  weight: string
  age: string
  pregnancy_period: string
  previous_pregnancies: string
}

const schema = Yup.object().shape({
  height: Yup.string().required(),
  weight: Yup.string().required(),
  age: Yup.string().required(),
  pregnancy_period: Yup.string().required('Pregnancy Period is reqiured'),
  previous_pregnancies: Yup.string().required('Previous Pregnancies is required')
})

const AddBioDataComponent : FC<{ handleToggle: ()  => void; user?: UserByRole, mother?: UserByRole }> = ({ 
  user,
  handleToggle,
  mother
}) =>  {
 console.log(user);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset 
  } = useForm<AddBioDataFormProps>({ 
    resolver: yupResolver(schema)
  })

  console.log("errors", errors)

  const [selectedMonthlyPeriod, setSelectedMonthlyPeriod] = useState<Dayjs | null>(null)
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState<Dayjs | null>(null)
  const [selectedClinicVisit, setSelectedClinicVisit] = useState<Dayjs | null>(null)

  const { mutate, isLoading } = useAddBioData(reset)

  const onSubmit = (data: AddBioDataFormProps) => {
   
    console.log('called', {...user, 
      last_clinic_visit: selectedClinicVisit, 
      last_monthly_period: selectedMonthlyPeriod, 
      expected_delivery_date: selectedDeliveryDate, facilityId: user?.facilityId })

    const item = {
      ...data,
      last_clinic_visit: selectedClinicVisit, 
      last_monthly_period: selectedMonthlyPeriod, 
      expected_delivery_date: selectedDeliveryDate,

      userId: mother?.id || '',
      facilityId: user?.facilityId || '',

    }
    
    mutate(item);

    handleToggle();
    
  }

  return (
    <CenterComponent>
      <form onSubmit={handleSubmit(onSubmit)}>

       <Card sx={{minWidth: 700}}>
          <CardHeader title={`Add Bio Data`} />
        <CardContent>
          
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '30ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          label="Height"
          id="outlined-size-small"
          placeholder='height'
          type='number'
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
          type='number'
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
          value={selectedMonthlyPeriod}
          onChange={(last_monthly_period) => setSelectedMonthlyPeriod(last_monthly_period)}
          
        />

        <DatePicker
          label="Expected Delivery date"
          value={selectedDeliveryDate}
          onChange={(expected_delivery_date) => setSelectedDeliveryDate(expected_delivery_date)}
          
        />

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

      </div>
      <div>
      
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
                data-testid="submit_button"
                
                >
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