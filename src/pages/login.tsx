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
import { Card, Col, Row} from 'react-bootstrap'
import { useForm } from 'react-hook-form'
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
    <Container>
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
      {/* <Container>
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
      </Container> */}
      
        <Row>
        <Container className='d-flex align-items-center justify-content-center'>
        <Card className='text-black m-5' style={{ borderRadius: '25px', width: '500px', margin: '0 auto', justifyContent: 'center'}} >
        <Card.Body>
          <Row>
          {/* <Col md='10' lg='4' className='order-1 order-lg-2 d-flex align-items-center'> */}
              <Card.Img src='https://res.cloudinary.com/dabfdxbfj/image/upload/v1688975254/Logo_M_y6dzkn.png' style={{width: '230px', height: '100px'}}/>
            {/* </Col>
            <Col md='10' lg='8' className='order-2 order-lg-1 d-flex flex-column align-items-center'> */}
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
            {/* </Col> */}
            
          </Row>
        </Card.Body>
      </Card>
      </Container>
        </Row>
        {/* <Row> */}
        <section className="section section-default mt-0 mb-0">
      <Container>
        <h2 className="mb-sm" style={{textAlign: 'center', justifyContent: 'center'}}>partnership solution by:</h2>
        <Row>
          <Col sm={6} md={4} lg={4}>
            <div className="square-holder">
              <Image alt="" src="https://res.cloudinary.com/dabfdxbfj/image/upload/v1688985663/AICS_ENG_V-N_gqf9md.png"  style={{width: '210px', height: '100px'}}/>
            </div>
          </Col>
          <Col sm={6} md={4} lg={4}>
            <div className="square-holder">
              <Image alt="" src="https://res.cloudinary.com/dabfdxbfj/image/upload/v1688985345/logo_hfqtfr.png"  style={{width: '210px', height: '100px'}}/>
            </div>
          </Col>
          <Col sm={6} md={4} lg={4}>
            <div className="square-holder">
              {/* <img alt="" src="https://res.cloudinary.com/dabfdxbfj/image/upload/v1688985345/logo_hfqtfr.png"  style={{width: '210px', height: '90px'}}/> */}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
        {/* </Row> */}
    </div>
    
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



