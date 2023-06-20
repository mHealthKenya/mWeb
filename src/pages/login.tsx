import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import { Button, Container, IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import nookies from 'nookies'
import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Users } from 'src/helpers/enums/users.enum'
import useLogin from 'src/services/auth/login'
import * as Yup from 'yup'

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
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
      <Container>
        <Row className="justify-content-center align-items-center px-3">
          <Col lg={7}>
            <Row>
              <Col md={12} className="bg-white border p-5">
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
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

    switch (user.role) {
      case Users.SuperAdmin:
        return {
          redirect: {
            destination: '/sadmin',
            permanent: false
          }
        }

      case Users.Admin: {
        return {
          redirect: {
            destination: '/admin',
            permanent: false
          }
        }
      }

      case Users.CHV: {
        return {
          redirect: {
            destination: '/chv',
            permanent: false
          }
        }
      }

      default:
        return {
          redirect: {
            destination: '/mother',
            permanent: false
          }
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
