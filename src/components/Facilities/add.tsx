import { yupResolver } from '@hookform/resolvers/yup'
import { Add } from '@mui/icons-material'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  TextField
} from '@mui/material'
import { useForm } from 'react-hook-form'
import useAddFacility from 'src/services/locations/add'
import * as Yup from 'yup'

interface FacilityData {
  name: string
}

const schema = Yup.object().shape({
  name: Yup.string().required('Location is a required field')
})

const NewFacilityComponent = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FacilityData>({
    resolver: yupResolver(schema)
  })

  const { mutate: addLocation, isLoading } = useAddFacility()

  const onSubmit = (data: FacilityData) => {
    addLocation(data.name)
    reset()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {' '}
      <Card>
        <CardHeader title="Add New Facility" />
        <CardContent>
          <TextField
            label="Facility Name"
            {...register('name')}
            error={!!errors.name?.message}
            helperText={errors.name?.message}
            size="small"
            fullWidth
          />{' '}
        </CardContent>
        <CardActionArea>
          <CardActions>
            <Button variant="contained" type="submit" startIcon={<Add />}>
              {isLoading ? 'Adding' : 'Add'}
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </form>
  )
}

export default NewFacilityComponent
