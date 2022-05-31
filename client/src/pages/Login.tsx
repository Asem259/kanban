import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { useLoginMutation, useRegisterMutation } from '../app/services/api';
import { Typography, Divider, Link } from '@mui/material';
import { Box, Container } from '@mui/system';
import { PasswordField } from '../components/PasswordField';

import { Credentials } from '../types/index.ts';
import { loginContainerStyle, BoxContainer } from '../app/styles/styles';

interface Props {
  page: string;
}

export const Login = ({ page }: Props) => {
  const [values, setValues] = useState<Credentials>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string>('');

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const isLoginPage = page === 'login';

  const handleChange =
    (prop: keyof Credentials) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: e.target.value });
    };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email))
      setError('Please enter valid Email');
    else {
      try {
        if (isLoginPage) {
          await login(values).unwrap();
          navigate('/home');
        } else {
          await register(values).unwrap();
          navigate('/login');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Container maxWidth='sm' sx={loginContainerStyle}>
      <Paper
        sx={{ minWidth: '400px', margin: '24px auto', padding: 2 }}
        elevation={4}
      >
        <Box sx={{ my: 3, width: '100%' }}>
          <Typography
            fontSize={32}
            fontWeight='bold'
            variant='h3'
            align='center'
            mb={2}
          >
            {isLoginPage ? 'Login' : 'Register'}
          </Typography>
          <Typography
            variant='body1'
            align='center'
            mb={4}
            color='GrayText'
            fontSize={16}
          >
            {isLoginPage
              ? 'Please login using account detail bellow.'
              : 'Create new account'}
          </Typography>
        </Box>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          direction='column'
        >
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ my: 1 }} variant='outlined' fullWidth>
              <TextField
                id='email'
                label='Email'
                variant='outlined'
                onChange={handleChange('email')}
                required
                error={Boolean(error)}
                helperText={error}
              />
            </FormControl>
            <PasswordField
              handleChange={handleChange}
              password={values.password}
            />

            <Box sx={{ my: 3, width: '100%', color: '#fff' }} my={2}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                disableElevation
                type='submit'
                size='large'
                sx={(theme) => ({ borderRadius: theme.shape.borderRadius })}
              >
                {isLoginPage ? 'Log in' : 'Register'}
              </Button>
            </Box>
          </form>
        </Grid>
        <Divider />
        <Box sx={BoxContainer} my={1}>
          <Link
            component={RouterLink}
            sx={{ margin: '16px auto 0 auto' }}
            underline='hover'
            to={isLoginPage ? '/register' : '/login'}
          >
            {isLoginPage
              ? 'Don’t have an Account? Sign up'
              : 'Already have an account?Login'}
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};
