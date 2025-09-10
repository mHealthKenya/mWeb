import CenterComponent from '@components/Shared/Center'
import { gender } from '@data/gender'
import { yupResolver } from '@hookform/resolvers/yup'
import type { Facility, UserByRole } from '@models/user-by-role'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from '@mui/material'
import useEditUser from '@services/users/edit-user'
import useAddBioData from '@services/biodata/add-biodata'
import { type FC, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { delivered } from '@data/delivered'
import useUsersByRole from 'src/services/users/by-role'

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

export enum Delivered {
  YES = 'Yes',
  NO = 'No'
}

export interface EditForm {
  f_name: string
  l_name: string
  email?: string
  phone_number: string
  role: string
  gender: string
  facilityId?: string
  age?: string
  hasDelivered?: string | boolean
  facilityAdmin?: string
  chpId?: string
  createdById?: string // Add this line
}

const roles = [Roles.ADMIN, Roles.FACILITY, Roles.CHV, Roles.MOTHER]

const validationSchema: any = Yup.object().shape({
  f_name: Yup.string().required('First name is required'),
  l_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').optional(),
  phone_number: Yup.string()
    .matches(/^254\d{9}$/, 'Invalid phone number format. Use this format 254xxxxxxxxx')
    .required('Phone number is a required field'),
  role: Yup.string().required('Role is required'),
  gender: Yup.string().required('Gender is required'),
  facilityId: Yup.string().optional(),
  age: Yup.string().optional(),
  hasDelivered: Yup.string().optional()
})

const EditUserWithRoleComponent: FC<{
  user: UserByRole | undefined
  handleToggle: () => void
  facilities?: Facility[]
}> = ({ user, handleToggle, facilities }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [chps, setChps] = useState<UserByRole[]>([])

  // Fetch all CHVs (CHPs)
  const { data: chvUsers = [] } = useUsersByRole(Roles.CHV, [])

  useEffect(() => {
    // Filter out the current user from the CHP list
    if (chvUsers) {
      setChps(chvUsers.filter((chp) => chp.id !== user?.id))
    }
  }, [chvUsers, user?.id])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<EditForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      f_name: user?.f_name || '',
      l_name: user?.l_name || '',
      email: user?.email || '',
      phone_number: user?.phone_number || '',
      role: user?.role || '',
      gender: user?.gender || '',
      facilityId: user?.facilityId || '',
      age: user?.BioData?.age ? String(user.BioData.age) : '',
      hasDelivered: user?.hasDelivered ? 'Yes' : 'No',
      facilityAdmin: user?.facilityAdmin || '',
      chpId: user?.facilityAdmin || ''
    }
  })

  // Set the CHP value when component mounts or when user/chps changes
  useEffect(() => {
    if (user?.createdById && chps.length > 0) {
      setValue('chpId', user.createdById)
    }
  }, [user, chps, setValue])

  // Pass handleToggle to useEditUser to automatically close modal on success
  const { mutate: editUser, isLoading: isEditingUser } = useEditUser(handleToggle)
  const { mutate: addBioData, isLoading: isAddingBioData } = useAddBioData()

  const onSubmit = async (data: EditForm) => {
    console.log('Form data:', data)
    setIsSubmitting(true)

    try {
      // Convert hasDelivered to boolean if it's a string
      const hasDelivered =
        typeof data.hasDelivered === 'string' ? data.hasDelivered === 'Yes' : data.hasDelivered

      // Separate age and chpId from other user data
      const { age, chpId, ...userData } = data

      // Update userData with boolean hasDelivered
      userData.hasDelivered = hasDelivered

      // If a CHP is selected, add it to the update data
      if (chpId) {
        userData.createdById = chpId
      }

      // Track which operations we need to perform
      const operations = []

      // Always update user data
      operations.push(
        new Promise((resolve, reject) => {
          editUser(
            {
              id: '' + user?.id,
              ...userData
            },
            {
              onSuccess: (data) => {
                console.log('User data updated successfully:', data)
                resolve(data)
              },
              onError: (error) => {
                console.error('Error updating user data:', error)
                reject(new Error('Failed to update user information'))
              }
            }
          )
        })
      )

      // Add biodata update operation if age is provided and changed
      if (age !== undefined && age !== '' && age !== String(user?.BioData?.age || '')) {
        console.log('Adding biodata update operation for age:', age)

        const bioDataPayload = {
          userId: user?.id || '',
          age: age,
          facilityId: user?.facilityId || '',
          last_clinic_visit: new Date()
        }

        operations.push(
          new Promise((resolve, reject) => {
            addBioData(bioDataPayload, {
              onSuccess: (responseData) => {
                console.log('Bio data updated successfully:', responseData)
                resolve(responseData)
              },
              onError: (error) => {
                console.error('Error updating bio data:', error)
                reject(new Error('Failed to update age information'))
              }
            })
          })
        )
      }

      // Wait for ALL operations to complete successfully
      console.log(`Executing ${operations.length} operations...`)
      await Promise.all(operations)

      // If we reach here, all operations succeeded
      console.log('All operations completed successfully')

      // Show single success message
      Swal.fire({
        title: 'Success!',
        text: 'User information has been updated successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      })

      // Modal will close automatically via useEditUser(handleToggle)
    } catch (error) {
      console.error('Error during form submission:', error)

      // Show single error message for any failure
      Swal.fire({
        title: 'Error!',
        text: error instanceof Error ? error.message : 'Failed to update user information',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Combined loading state
  const isLoading = isEditingUser || isAddingBioData || isSubmitting

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
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  label="Role"
                  size="small"
                  defaultValue={user?.role}
                  {...register('role')}
                  error={!!errors.role?.message}
                  inputProps={{ 'data-testid': 'role_input' }}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role === Roles.FACILITY
                        ? 'Facility Admin'
                        : role === Roles.CHV
                        ? 'CHP'
                        : role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size="small" required>
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                  labelId="gender-select-label"
                  id="gender-select"
                  label="Gender"
                  size="small"
                  defaultValue={user?.gender}
                  {...register('gender')}
                  error={!!errors.gender?.message}
                  inputProps={{ 'data-testid': 'gender_input' }}>
                  {gender?.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {facilities && (
                <FormControl fullWidth size="small">
                  <InputLabel id="facility-select-label">Facility</InputLabel>
                  <Select
                    labelId="facility-select-label"
                    id="facility-select"
                    label="Facility"
                    size="small"
                    defaultValue={user?.facilityId}
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
              )}

              {user?.role === Roles.MOTHER && (
                <FormControl fullWidth size="small">
                  <InputLabel id="chp-select-label">Assign CHP</InputLabel>
                  <Select
                    labelId="chp-select-label"
                    id="chp-select"
                    label="Assign CHP"
                    size="small"
                    value={watch('chpId') || ''}
                    onChange={(e) => setValue('chpId', e.target.value)}
                    inputProps={{ 'data-testid': 'chp_select' }}
                    renderValue={(selected) => {
                      if (!selected) return <em>None</em>
                      const selectedChp = chps.find((chp) => chp.id === selected)
                      return selectedChp ? (
                        `${selectedChp.f_name} ${selectedChp.l_name}${
                          selectedChp.Facility?.name ? ` (${selectedChp.Facility.name})` : ''
                        }`
                      ) : (
                        <em>None</em>
                      )
                    }}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {chps.map((chp) => (
                      <MenuItem key={chp.id} value={chp.id}>
                        {`${chp.f_name} ${chp.l_name}`}
                        {chp.Facility?.name && ` (${chp.Facility.name})`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {user?.role === Roles.MOTHER && (
                <TextField
                  label="Age"
                  size="small"
                  fullWidth
                  type="number"
                  defaultValue={String(user?.BioData?.age || '')}
                  {...register('age')}
                  error={!!errors.age?.message}
                  helperText={errors?.age?.message || 'Age will be updated in biodata'}
                  inputProps={{
                    'data-testid': 'age_input',
                    min: 0,
                    max: 150
                  }}
                />
              )}

              {user?.role === Roles.MOTHER && (
                <FormControl fullWidth size="small" required>
                  <InputLabel id="delivered-select-label">Delivered</InputLabel>
                  <Select
                    labelId="delivered-select-label"
                    id="delivered-select"
                    label="Delivered"
                    size="small"
                    defaultValue={user?.hasDelivered ? 'Yes' : 'No'}
                    {...register('hasDelivered')}
                    error={!!errors.hasDelivered?.message}
                    inputProps={{ 'data-testid': 'hasDelivered_input' }}>
                    {delivered?.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Stack>
          </CardContent>

          <CardActions>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={isLoading}
              data-testid="submit_button">
              {isLoading ? 'Updating...' : 'Update User'}
            </Button>
            <Button variant="contained" color="error" onClick={handleToggle} disabled={isLoading}>
              Cancel
            </Button>
          </CardActions>
        </Card>
      </form>
    </CenterComponent>
  )
}

export default EditUserWithRoleComponent
