
import React, { FC } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField
} from '@mui/material'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useAddSchedule from '@services/schedules/addschedules'
import { Facility, UserByRole } from '@models/user-by-role'


export interface AddScheduleForm {
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
  date: Yup.string().required(),
  status: Yup.string().required()
})

const AddScheduleComponent: FC<{facilities: Facility[],mothers: UserByRole }> = ({facilities, mothers}) => {

  const { register, handleSubmit, formState: {errors}, reset} = useForm<AddScheduleForm>({
    resolver: yupResolver(schema)
  })

  const {mutate, isLoading} = useAddSchedule(reset)


  const onSubmit = (data: AddScheduleForm) => {
    const item = {
      ...data
    }
    mutate(item)
  }



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        
        <CardHeader title="Schedule Visit" subheader="All fields marked with * are required fields" />
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
                {/* {mothers.map((mother: any) => (
                  <MenuItem value={mother.id} key={mother.id}>
                    {mother.name}
                  </MenuItem>
                ))} */}
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
                {facilities.map((facility: any) => (
                  <MenuItem value={facility.id} key={facility.id}>
                    {facility.name}
                  </MenuItem>
                ))}
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
            type="submit"
            fullWidth
            disabled={isLoading}>
            Cancel
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}

export default AddScheduleComponent