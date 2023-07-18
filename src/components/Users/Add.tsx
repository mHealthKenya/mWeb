import { yupResolver } from '@hookform/resolvers/yup'
import { Facility } from '@models/facility'
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
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { gender } from '../../data/gender'
import { rolesSuperAdmin } from '../../data/roles'
import useAddUser from '../../services/users/add-user'

export interface AddUserFormProps {
  f_name: string
  l_name: string
  email: string
  national_id: string
  gender: string
  phone_number: string
  facilityId: string
  role: string
}

const schema = Yup.object().shape({
  f_name: Yup.string().required(),
  l_name: Yup.string().required(),
  email: Yup.string().optional(),
  national_id: Yup.string().required('National Id is a required field'),
  gender: Yup.string().required('Gender is a required field'),
  phone_number: Yup.string()
    .matches(/^254\d{9}$/, 'Invalid phone number format. Use this format 254xxxxxxxxx')
    .required('Phone number is a required field'),
  facilityId: Yup.string().optional(),
  role: Yup.string().required('Role is a required field')
})

const AddUserComponent: FC<{ facilities: Facility[] }> = ({ facilities }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AddUserFormProps>({
    resolver: yupResolver(schema)
  })

  const { mutate, isLoading } = useAddUser(reset)

  const onSubmit = (data: AddUserFormProps) => {
    const item = {
      ...data,
      role: data.role === 'Facility Admin' ? 'Facility' : data.role
    }

    mutate(item)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader title="Add a user" subheader="All fields marked with * are required fields" />
        <CardContent>
          <Stack spacing={1}>
            <TextField
              size="small"
              fullWidth
              label="First Name"
              {...register('f_name')}
              required
              helperText={errors?.f_name?.message}
              error={!!errors?.f_name?.message}
              inputProps={{ 'data-testid': 'f_name_input' }}
            />
            <TextField
              size="small"
              fullWidth
              label="Last Name"
              {...register('l_name')}
              required
              helperText={errors?.l_name?.message}
              error={!!errors?.l_name?.message}
              inputProps={{ 'data-testid': 'l_name_input' }}
            />
            <TextField
              size="small"
              fullWidth
              label="Email"
              type="email"
              {...register('email')}
              helperText={errors?.email?.message}
              error={!!errors?.email?.message}
              inputProps={{ 'data-testid': 'email_input' }}
            />
            <TextField
              size="small"
              fullWidth
              label="Phone Number"
              {...register('phone_number')}
              placeholder="254*********"
              required
              helperText={errors?.phone_number?.message}
              error={!!errors?.phone_number?.message}
              inputProps={{ 'data-testid': 'phone_input' }}
            />
            <TextField
              size="small"
              fullWidth
              label="National ID"
              {...register('national_id')}
              required
              helperText={errors?.national_id?.message}
              error={!!errors?.national_id?.message}
              inputProps={{ 'data-testid': 'id_input' }}
            />
            <FormControl fullWidth size="small">
              <InputLabel id="facility">Facility</InputLabel>
              <Select
                labelId="facility-label"
                id="facility"
                label="Facility"
                {...register('facilityId')}
                error={!!errors?.l_name?.message}
                defaultValue=""
                inputProps={{ 'data-testid': 'facility_input' }}>
                {facilities.map((facility) => (
                  <MenuItem value={facility.id} key={facility.id}>
                    {facility.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors?.facilityId?.message}</FormHelperText>
            </FormControl>
            <FormControl fullWidth size="small" required>
              <InputLabel id="role">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                label="Role"
                {...register('role')}
                required
                error={!!errors?.national_id?.message}
                defaultValue=""
                inputProps={{ 'data-testid': 'role_input' }}>
                {rolesSuperAdmin.map((role, index) => (
                  <MenuItem value={role} key={index}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors?.role?.message}</FormHelperText>
            </FormControl>
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
            size="small"
            type="submit"
            fullWidth
            disabled={isLoading}>
            {isLoading ? 'Adding User' : 'Add User'}
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}

export default AddUserComponent
