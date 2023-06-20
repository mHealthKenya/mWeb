import CenterComponent from '@components/Shared/Center'
import { UserByRole } from '@models/user-by-role'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField
} from '@mui/material'
import { FC } from 'react'
import { FormLabel } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import useEditUser from 'src/services/users/edit-user'

export enum Roles {
  ADMIN = 'Admin',
  FACILITY = 'Facility',
  CHV = 'CHV',
  MOTHER = 'Mother'
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female'
}

export interface EditForm {
  f_name: string
  l_name: string
  email: string
  role: string
  gender: string
}

const roles = [Roles.ADMIN, Roles.FACILITY, Roles.CHV, Roles.MOTHER]

const genders = [Gender.MALE, Gender.FEMALE]

const validationSchema = Yup.object().shape({
  f_name: Yup.string().required('First name is required'),
  l_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  role: Yup.string().required('Role is required'),
  gender: Yup.string().required('Gender is required')
})

const EditUserWithRoleComponent: FC<{ user: UserByRole | undefined; handleToggle: () => void }> = ({
  user,
  handleToggle
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditForm>({
    resolver: yupResolver(validationSchema)
  })

  const { mutate, isLoading } = useEditUser(handleToggle)

  const onSubmit = (data: EditForm) => {
    mutate({
      id: '' + user?.id,
      ...data
    })
  }

  return (
    <CenterComponent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ minWidth: '480px' }}>
          <CardHeader title="Edit User" />
          <CardContent>
            <Stack spacing={1}>
              <TextField
                label="First Name"
                size="small"
                fullWidth
                defaultValue={user?.f_name}
                {...register('f_name')}
                error={!!errors.f_name?.message}
                helperText={errors?.f_name?.message}
              />
              <TextField
                label="Last Name"
                size="small"
                fullWidth
                defaultValue={user?.l_name}
                {...register('l_name')}
                error={!!errors.l_name?.message}
                helperText={errors?.l_name?.message}
              />
              <TextField
                label="Email"
                size="small"
                fullWidth
                defaultValue={user?.email}
                type="email"
                {...register('email')}
                error={!!errors.email?.message}
                helperText={errors?.email?.message}
              />
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Role"
                  size="small"
                  defaultValue={user?.role}
                  {...register('role')}
                  error={!!errors.role?.message}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role === Roles.FACILITY ? 'Facility Admin' : role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={user?.gender}
                  {...register('gender')}>
                  {genders.map((gender) => (
                    <FormControlLabel
                      value={gender}
                      key={gender}
                      control={<Radio />}
                      label={gender}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Stack>
          </CardContent>
          <CardActionArea>
            <CardActions>
              <Button variant="contained" color="success" type="submit" disabled={isLoading}>
                {isLoading ? 'Editing...' : 'Edit'}
              </Button>
              <Button variant="contained" color="error" onClick={handleToggle}>
                Cancel
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
      </form>
    </CenterComponent>
  )
}

export default EditUserWithRoleComponent
