
import React, { FC } from 'react'
import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormHelperText,
  Stack,
  TextField
} from '@mui/material'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useAddSchedule from '@services/schedules/addschedules'
import {  UserByRole } from '@models/user-by-role'
import CenterComponent from '@components/Shared/Center'
import { Schedule } from '@models/schedule'



export interface AddScheduleForm {
  motherId: string
  title: string
  description: string
  date: Date
  status: string

}

const schema = Yup.object().shape({
  motherId: Yup.string().required(),
  title: Yup.string().required(),
  description: Yup.string().required(),
  date: Yup.date().required(),
  status: Yup.string().required()
})

const AddScheduleComponent: FC<{mothers: UserByRole[], facilityID: string, handleToggle: () => void}> = ({mothers, facilityID, handleToggle}) => {

  const { register, handleSubmit, formState: {errors}} = useForm<AddScheduleForm>({
    resolver: yupResolver(schema)
  })

  const {mutate, isLoading} = useAddSchedule(handleToggle)

  console.log('Add Schedule here: ', errors)

  const onSubmit = (data: AddScheduleForm) => {
    console.log('Test')
    const item: Schedule = {
      id: '',
      facilityId: facilityID,
      motherId: data.motherId,
      title: data.title,
      description: data.description,
      date: data.date,
      status: data.status,
    };
    mutate(item)
    handleToggle();
  }

  const motherName = mothers.map((mother) => {
    const fName = mother.f_name
    const lName = mother.l_name
    return fName + ' ' + lName
  })


  return (
    <CenterComponent>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card style={{width: '600px'}}>
        
        <CardHeader title="Schedule Visit" subheader="All fields marked with * are required fields" />
        <CardContent>
          <Stack spacing={1}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={motherName}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Mothers" 
                {...register('motherId')}
                helperText={errors?.motherId?.message}
                error={!!errors?.motherId?.message}/>
              }/>
              <FormHelperText>{errors?.motherId?.message}</FormHelperText>
            
            <TextField
              size="small"
              fullWidth
              label="Title"
              {...register('title')}
              required
              helperText={errors?.title?.message}
              error={!!errors?.title?.message}
              inputProps={{ 'data-testid': 'title_input' }}
            />
            <TextField
              size="small"
              fullWidth
              label="Description"
              {...register('description')}
              required
              helperText={errors?.description?.message}
              error={!!errors?.description?.message}
              inputProps={{ 'data-testid': 'description_input' }}
            />
            <TextField
              size="small"
              fullWidth
              type='date'
              label="Date"
              {...register('date')}
              required
              helperText={errors?.date?.message}
              error={!!errors?.date?.message}
              inputProps={{ 'data-testid': 'date_input' }}
            />
            {/* <DateTimePicker 
               label="Date"
               value={scheduleDate}
               onChange={(e) => setScheduleDate(e.target.value)}
               /> */}
               <FormHelperText>{errors?.date?.message}</FormHelperText>
            <TextField
              size="small"
              fullWidth
              label="Status"
              {...register('status')}
              required
              helperText={errors?.status?.message}
              error={!!errors?.status?.message}
              inputProps={{ 'data-testid': 'status_input' }}
            />
          </Stack>
        </CardContent>

        <CardActions>
          <Button
          style={{width: '200px'}}
            variant="contained"
            color="success"
            size="small"
            type="submit"
            fullWidth
            disabled={isLoading}>
            {isLoading ? 'Adding Schedule' : 'Set Schedule'}
          </Button>
          <Button
          style={{width: '200px'}}
            variant="contained"
            color="error"
            size="small"
            fullWidth
            disabled={isLoading} onClick={handleToggle}>
            Cancel
          </Button>
        </CardActions>
      </Card>
    </form>
    </CenterComponent>
  )
}

export default AddScheduleComponent
