import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import { Button, Container, IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import nookies from 'nookies'
import { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import useLogin from 'src/services/auth/login'
import * as Yup from 'yup'

// Required Logos
import mLogo from 'public/assets/brand/Logo.png'
import mhealthLogo from 'public/assets/brand/mhealthlogo.png'
import AICSLogo from 'public/assets/brand/AICS.png'

export interface LoginCredentials {
  email: string
  password: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').required('Email is required'),
  password: Yup.string().required('Password is required')
})

const Login: NextPage = () => {
  const [see, setSee] = useState(false)

  const toggleSee = () => {
    setSee(() => !see)
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginCredentials>({
    resolver: yupResolver(validationSchema)
  })

  const { mutate: login, isLoading } = useLogin()

  const onSubmit = (credentials: LoginCredentials) => {
    login(credentials)
  }

  return (
    <Container className='d-flex flex-column align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
      <Card className='text-black m-5' style={{ borderRadius: '25px', width: '500px', justifyContent: 'center', alignItems: 'center' }}>
        <Card.Body>
        <div className="square-holder">
              <Image alt="" src={mLogo} style={{ width: '210px', height: '100px' }} />
            </div>
          <div className="">
            <h1>Login</h1>
            <p className="text-black-50">Sign In to your account</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3} sx={{ mb: 3 }}>
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
                <TextField
                  size="small"
                  label="Password"
                  type={see ? 'text' : 'password'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={toggleSee}>
                          {see ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  {...register('password')}
                  error={!!errors?.password?.message}
                  helperText={errors?.password?.message}
                />
              </Stack>
              <Row>
                <Col xs={4}>
                  <Button
                    className="px-4"
                    type="submit"
                    disabled={isLoading}
                    variant="contained">
                    {isLoading ? 'Submitting ' : 'Login'}
                  </Button>
                </Col>
                <Col xs={8} className="text-end">
                  <Link href="/register">Forgot password</Link>
                </Col>
              </Row>
            </form>
          </div>
        </Card.Body>
      </Card>

      <section className="section section-default mt-0 mb-0">
        <h5 className="mb-sm text-sm" style={{ textAlign: 'center', justifyContent: 'center' }}>partnership solution by:</h5>
        <Row>
          <Col xs={12} sm={6} md={4} lg={4}>
            <div className="square-holder">
              <Image alt="" src={mhealthLogo} style={{ width: '210px', height: '100px' }} />
            </div>
          </Col>
          <Col xs={12} sm={6} md={4} lg={4}>
            <div className="square-holder">
              <Image alt="" src={AICSLogo} style={{ width: '210px', height: '100px' }} />
            </div>
          </Col>
          <Col xs={12} sm={6} md={4} lg={4}>
            <div className="square-holder">
              <Image alt="" src={mLogo} style={{ width: '210px', height: '90px' }} />
            </div>
          </Col>
        </Row>
      </section>
    </Container>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  } catch (error) {
    return {
      props: {
        data: 'Success login'
      }
    }
  }
}



