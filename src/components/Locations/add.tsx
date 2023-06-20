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
import useAddLocation from 'src/services/locations/add'
import * as Yup from 'yup'

interface LocationData {
  location_name: string
}

const schema = Yup.object().shape({
  location_name: Yup.string().required('Location is a required field')
})

const NewLocationComponent = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LocationData>({
    resolver: yupResolver(schema)
  })

  const { mutate: addLocation, isLoading } = useAddLocation()

  const onSubmit = (data: LocationData) => {
    addLocation(data.location_name)
    reset()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {' '}
      <Card>
        <CardHeader title="Add New Location" />
        <CardContent>
          <TextField
            label="Location"
            {...register('location_name')}
            error={!!errors.location_name?.message}
            helperText={errors.location_name?.message}
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

export default NewLocationComponent
