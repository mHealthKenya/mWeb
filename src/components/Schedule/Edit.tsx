
import React, { FC } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  Stack,
  TextField
} from '@mui/material'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useUpdateSchedule from '@services/schedules/editschedule'
import CenterComponent from '@components/Shared/Center'


export interface EditScheduleForm {
  motherId: string
  title: string
  description: string
  facilityId: string
  date: Date
  status: string

}

const schema = Yup.object().shape({
  motherId: Yup.string().required(),
  title: Yup.string().required(),
  description: Yup.string().required(),
  facilityId: Yup.string().required(),
  date: Yup.date().required(),
  status: Yup.string().required()
})

const EditScheduleComponent: FC<{
  handleToggle: () => void
  facilityID: string,}> = ({ handleToggle, facilityID}) => {

  const { register, handleSubmit, formState: {errors}} = useForm<EditScheduleForm>({
    resolver: yupResolver(schema)
  })

  const {mutate, isLoading} = useUpdateSchedule(handleToggle)


  const onSubmit = (data: EditScheduleForm) => {
    const item = {
      id: '',
      facilityID,
      ...data
    }
    mutate(item)
  }



  return (
    <CenterComponent>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader title="Update Schedule" subheader="All fields marked with * are required fields" />
        <CardContent>
          <Stack spacing={1}>
          <FormControl fullWidth size="small">
              <InputLabel id="mother">Mother</InputLabel>
              <Select
                labelId="facility-label"
                id="mother"
                label="Mother"
                {...register('motherId')}
                error={!!errors?.motherId?.message}
                defaultValue=""
                inputProps={{ 'data-testid': 'mother_input' }}>
              </Select>
              <FormHelperText>{errors?.motherId?.message}</FormHelperText>
            </FormControl>
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
            <FormControl fullWidth size="small">
              <InputLabel id="facility">Facility</InputLabel>
              <Select
                labelId="facility-label"
                id="facility"
                label="Facility"
                {...register('facilityId')}
                error={!!errors?.facilityId?.message}
                defaultValue=""
                inputProps={{ 'data-testid': 'mother_input' }}>
              </Select>
              <FormHelperText>{errors?.facilityId?.message}</FormHelperText>
            </FormControl>
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
            variant="contained"
            color="success"
            size="small"
            type="submit"
            fullWidth
            disabled={isLoading}>
            {isLoading ? 'Updating Schedule' : 'Update Schedule'}
          </Button>
          <Button
          style={{width: '200px'}}
            variant="contained"
            color="error"
            size="small"
            type="submit"
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

export default EditScheduleComponent
