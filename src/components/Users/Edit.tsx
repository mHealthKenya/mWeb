import CenterComponent from '@components/Shared/Center'
import { gender } from '@data/gender'
import { yupResolver } from '@hookform/resolvers/yup'
import { Facility, UserByRole } from '@models/user-by-role'
import {
  Button,
  Card,
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
import useEditUser from '@services/users/edit-user'
import { FC } from 'react'
import { FormLabel } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

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
  phone_number: string
  role: string
  gender: string
  facilityId?: string
}

const roles = [Roles.ADMIN, Roles.FACILITY, Roles.CHV, Roles.MOTHER]

const validationSchema: any = Yup.object().shape({
  f_name: Yup.string().required('First name is required'),
  l_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone_number: Yup.string()
    .matches(/^254\d{9}$/, 'Invalid phone number format. Use this format 254xxxxxxxxx')
    .required('Phone number is a required field'),
  role: Yup.string().required('Role is required'),
  gender: Yup.string().required('Gender is required'),
  facilityId: Yup.string().optional()
})

const EditUserWithRoleComponent: FC<{
  user: UserByRole | undefined
  handleToggle: () => void
  facilities?: Facility[]
}> = ({ user, handleToggle, facilities }) => {
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
                inputProps={{ 'data-testid': 'f_name_input' }}
              />
              <TextField
                label="Last Name"
                size="small"
                fullWidth
                defaultValue={user?.l_name}
                {...register('l_name')}
                error={!!errors.l_name?.message}
                helperText={errors?.l_name?.message}
                inputProps={{ 'data-testid': 'l_name_input' }}
              />
              <TextField
                size="small"
                fullWidth
                label="Phone Number"
                defaultValue={user?.phone_number}
                {...register('phone_number')}
                placeholder="254*********"
                required
                helperText={errors?.phone_number?.message}
                error={!!errors?.phone_number?.message}
                inputProps={{ 'data-testid': 'phone_input' }}
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
                inputProps={{ 'data-testid': 'email_input' }}
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
                  error={!!errors.role?.message}
                  inputProps={{ 'data-testid': 'role_input' }}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role === Roles.FACILITY ? 'Facility Admin' : role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {facilities ? (
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-facility">Facility</InputLabel>
                  <Select
                    labelId="demo-simple-select-facility"
                    id="demo-simple-select-facility"
                    label="Facility"
                    size="small"
                    defaultValue={user?.facilityId || ''}
                    {...register('facilityId')}
                    error={!!errors.facilityId?.message}
                    inputProps={{ 'data-testid': 'facility_input' }}>
                    {facilities?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : null}
              <FormControl required>
                <FormLabel id="gender-radio">Gender</FormLabel>
                <RadioGroup aria-labelledby="gender" defaultValue="Female" {...register('gender')}>
                  {gender.map((item, index) => (
                    <FormControlLabel value={item} control={<Radio />} label={item} key={index} />
                  ))}
                </RadioGroup>
              </FormControl>
            </Stack>
          </CardContent>

          <CardActions>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={isLoading}
              data-testid="submit_button">
              {isLoading ? 'Editing...' : 'Edit'}
            </Button>
            <Button variant="contained" color="error" onClick={handleToggle}>
              Cancel
            </Button>
          </CardActions>
        </Card>
      </form>
    </CenterComponent>
  )
}

export default EditUserWithRoleComponent
