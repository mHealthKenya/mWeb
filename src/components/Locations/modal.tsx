import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  TextField
} from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import * as React from 'react'
import { LocationData } from './single'
import { Delete, Edit } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import useUpdateLocation, { UpdateLocation } from 'src/services/locations/update'
import useDeleteLocation from 'src/services/locations/delete'
import Swal from 'sweetalert2'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400
}

interface EditProps {
  location_name: string
}

const schema = Yup.object().shape({
  location_name: Yup.string().required('Location is required')
})

const EditOrDeleteLocationComponent: React.FC<{
  locationData: LocationData
  open: boolean
  handleToggle: () => void
}> = ({ locationData, open, handleToggle }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditProps>({
    resolver: yupResolver(schema)
  })

  const { mutate: updateLocation, isLoading: isEditing } = useUpdateLocation(handleToggle)

  const { mutate: deleteLoc, isLoading: isDeleting } = useDeleteLocation()

  const handleDelete = (id: string) => {
    handleToggle()
    Swal.fire({
      title: 'Are you sure?',
      showDenyButton: true,
      denyButtonText: 'No',
      confirmButtonText: 'Yes, Go Ahead'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteLoc(id)
      }
    })
  }

  const onSubmit = (formData: EditProps) => {
    const updateData: UpdateLocation = {
      id: locationData.location.id,
      location_name: formData.location_name
    }
    updateLocation(updateData)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardHeader title="Edit or delete location" />
              <CardContent>
                <TextField
                  fullWidth
                  size="small"
                  defaultValue={locationData.location.location_name}
                  {...register('location_name')}
                  error={!!errors.location_name}
                  helperText={errors.location_name?.message}
                />
              </CardContent>
              <CardActionArea>
                <CardActions>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    startIcon={<Edit />}
                    type="submit"
                    disabled={isEditing}>
                    {isEditing ? 'Editing' : 'Edit'}
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(locationData.location.id)}
                    disabled={isDeleting}>
                    {isDeleting ? 'Deleting' : 'Delete'}
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default EditOrDeleteLocationComponent
