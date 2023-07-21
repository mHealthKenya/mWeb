import { useEffect } from 'react'; // Add this import if you need to use useEffect
import CenterComponent from '@components/Shared/Center';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import usePasswordReset from '@services/auth/password-reset';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import React from 'react';
import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';

export interface Passrest {
  code: string;
  email: string;
  password: string;
  pass2: string; // Add the confirm password field
}



const passwordreset = () => {
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      // .matches(/^[a-zA-Z0-9]+$/, 'Password must be alphanumeric')
      .required('Password is required'),
    pass2: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match') // Validate if the confirm password matches the password
      .required('Confirm Password is required'),
  });
  
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Passrest>({
    resolver: yupResolver(validationSchema),
  });
  
  const { mutate: newPassword, isLoading } = usePasswordReset();
  
  const onSubmit = (data: Passrest) => {
    const { pass2, ...requestData } = data;
    console.log(requestData)
    newPassword(requestData);
  };

  return (
    <CenterComponent>
      {/* <h1>Hello Next</h1> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ minWidth: '480px' }}>
          <CardHeader title="Reset Password" />
          <CardContent>
            <Typography variant="body2" color="text.secondary" component="p">
              Please enter all fields <span style={{color: 'red'}}>*</span>.
            </Typography>
            <br />
            <TextField
              size="small"
              label="OTP"
              InputProps={{
                startAdornment: <InputAdornment position="start"><VpnKeyIcon /></InputAdornment>,
              }}
              {...register('code')}
              error={!!errors?.code?.message}
              helperText={errors?.code?.message}
            />
              <br /><br />
            <TextField
              size="small"
              label="Email"
              InputProps={{
                startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
              }}
              {...register('email')}
              error={!!errors?.email?.message}
              helperText={errors?.email?.message}
            />
            <br />
            <br />
            <TextField
              size="small"
              label="Password"
              type="password" // Make sure the password input is of type "password"
              InputProps={{
                startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>,
              }}
              {...register('password')}
              error={!!errors?.password?.message}
              helperText={errors?.password?.message}
            />
            <br />
            <br />
            <TextField
              size="small"
              label="Confirm Password"
              type="password" // Make sure the confirm password input is of type "password"
              InputProps={{
                startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>,
              }}
              {...register('pass2')}
              error={!!errors?.pass2?.message}
              helperText={errors?.pass2?.message}
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
            <Button variant="contained" color="error" >
              Cancel
            </Button>
          </CardActions>
        </Card>
      </form>
    </CenterComponent>
  );
};

export default passwordreset;
