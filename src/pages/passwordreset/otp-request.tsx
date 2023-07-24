import CenterComponent from '@components/Shared/Center'
import { Button, Card, CardActions, CardContent, CardHeader, InputAdornment, TextField, Typography } from '@mui/material'
import React, { FC } from 'react'
import EmailIcon from '@mui/icons-material/Email'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useOtpRequest from '@services/auth/otp-request'
// import { useRouter } from 'next/router'
// import useOtpRequest from '@services/auth/password-reset'


export interface OTP {
  email: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').required('Email is required'),
})

const OtpRequest: FC<{
  handleToggle: () => void
}> = ({handleToggle}) => {

  // const [open]

  // const handleToggle = () => {
  //   setOpen((open) => !open)
  // }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<OTP>({
    resolver: yupResolver(validationSchema)
  })

  const {mutate: otpRequest, isLoading} = useOtpRequest(handleToggle)

  const onSubmit = (data: OTP) => {
    console.log('************************')
    console.log(data)
    console.log('************************')
    otpRequest(data)
    handleToggle()
  }

  return (
    <CenterComponent>
      {/* <h1>Hello Next</h1> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{minWidth: '480px'}}>
          <CardHeader title="Forget Password" />
          <CardContent>
            <Typography variant="body2" color="text.secondary" component="p">
              Please check your email to reset your password.
            </Typography>
            <br />
            <TextField
                  size="small"
                  label="Email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    )
                  }}
                  {...register('email')}
                  error={!!errors?.email?.message}
                  helperText={errors?.email?.message}
                />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={isLoading}
              data-testid="submit_button">
              {isLoading ? 'Submitting ' : 'Submit'}
            </Button>
            <Button variant="contained" color="error" type='submit' 
                    onClick={handleToggle}
                    >
              Cancel
            </Button>
          </CardActions>
        </Card>
      </form>
    </CenterComponent>
  )
}

export default OtpRequest
