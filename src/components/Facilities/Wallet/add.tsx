import { yupResolver } from '@hookform/resolvers/yup'
import { User } from '@models/user'
import { UserByRole } from '@models/user-by-role'
import { Add, CloudUploadOutlined } from '@mui/icons-material'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  styled
} from '@mui/material'
import useAddMother from '@services/chvmother/add'
import React, { FC } from 'react'
import { FormLabel } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface AddWalletRecordFormProps {
  f_name: string
  l_name: string
  email?: string
  national_id: string
  phone_number: string
}

const schema = Yup.object().shape({
  f_name: Yup.string().required(),
  l_name: Yup.string().required(),
  email: Yup.string().optional(),
  national_id: Yup.string().required('National Id is a required field'),
  phone_number: Yup.string()
    .matches(/^254\d{9}$/, 'Invalid phone number format. Use this format 254xxxxxxxxx')
    .required('Phone number is a required field')
})

export interface AddMotherProps {
  facilityId?: string
  chv?: User
}

const WalletRecordComponent: FC<{
  // datas: AddMotherProps
  user?: UserByRole
  handleToggle: () => void
}> = ({ handleToggle, user }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const { mutate, isLoading } = useAddMother(reset)

  const onSubmit = (data: AddWalletRecordFormProps) => {
    const item = {
      ...data,
      role: 'Mother',
      gender: 'Female',
      facilityId: user?.facilityId || '',
      email: data.email || null
    }
    mutate(item)
    handleToggle()
    reset()
  }

  const drugsissued = ['Yes', 'No']
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: '40px',
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 5
  })

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ minWidth: 680, mt: 3, mb: 3 }}>
          <CardHeader
            title="Add Transaction Details"
            subheader="All fields marked with * are required fields"
          />
          <CardContent>
            <Stack spacing={1}>
              <TextField
                size="small"
                fullWidth
                label="Service"
                rows={4}
                multiline
                {...register('f_name')}
                required
                helperText={errors?.f_name?.message}
                error={!!errors?.f_name?.message}
                inputProps={{ 'data-testid': 'f_name_input' }}
              />
              <TextField
                size="small"
                fullWidth
                label="Nurse"
                {...register('l_name')}
                required
                helperText={errors?.l_name?.message}
                error={!!errors?.l_name?.message}
                inputProps={{ 'data-testid': 'l_name_input' }}
              />
              <Controller
                name="f_name"
                control={control}
                // defaultValue={clinicVisit?.tetanus || ''}
                render={({ field }) => (
                  <>
                    <FormLabel required error={!!errors?.email?.message}>
                      Drugs issued?
                    </FormLabel>
                    <RadioGroup {...field} row>
                      {[...drugsissued].map((state, index) => (
                        <FormControlLabel
                          value={state}
                          control={<Radio />}
                          label={state}
                          key={index}
                        />
                      ))}
                    </RadioGroup>
                  </>
                )}
              />
              <div style={{ display: 'flex', gap: '16px' }}>
                <TextField
                  size="small"
                  fullWidth
                  label="Balance"
                  variant="filled"
                  {...register('national_id')}
                  helperText={errors?.national_id?.message}
                  error={!!errors?.national_id?.message}
                  inputProps={{
                    'data-testid': 'phone_input'
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Ksh: </InputAdornment>
                  }}
                />

                <TextField
                  size="small"
                  fullWidth
                  label="Amount Charged"
                  variant="filled"
                  {...register('national_id')}
                  required
                  helperText={errors?.national_id?.message}
                  error={!!errors?.national_id?.message}
                  inputProps={{ 'data-testid': 'id_input' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Ksh: </InputAdornment>
                  }}
                />
              </div>
              <br />
              <div style={{ display: 'flex', gap: '20px' }}>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadOutlined />}>
                  Upload invoice
                  <VisuallyHiddenInput type="file" />
                </Button>
              </div>{' '}
              <br />
            </Stack>
            {/* </Box> */}

            <CardActions>
              <Button
                variant="contained"
                // color="success"
                type="submit"
                startIcon={<Add />}
                disabled={isLoading}>
                {isLoading ? 'Submiting' : 'Submit Transaction'}
              </Button>

              <Button variant="contained" color="error" onClick={handleToggle}>
                Cancel
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </form>
    </>
  )
}

export default WalletRecordComponent
