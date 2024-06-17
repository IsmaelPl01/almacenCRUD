import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Box, Typography } from '@mui/material';
import * as Yup from 'yup';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  passwordHash: Yup.string().min(6, 'Password too short').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Password must contain at least one letter and one number').required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Box
        p={4}
        bgcolor="white"
        boxShadow={3}
        borderRadius={5}
        width={400}
      >
        <Typography variant="h5" mb={2}>Login</Typography>
        <Formik
          initialValues={{ username: '', passwordHash: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            api.post('/Users/login', values)
              .then(response => {
                localStorage.setItem('token', response.data.token);
                setSubmitting(false);
                navigate('/products');
              })
              .catch(error => {
                setSubmitting(false);
                console.error('There was an error!', error);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="username"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              </Box>
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="passwordHash"
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                fullWidth
              >
                Login
              </Button>
              <Button
                variant="text"
                color="primary"
                fullWidth
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
