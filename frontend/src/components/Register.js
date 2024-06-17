import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Box, Typography } from '@mui/material';
import * as Yup from 'yup';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const RegisterSchema = Yup.object().shape({
  username: Yup.string().matches(/^[a-zA-Z0-9_]+$/, 'Invalid username').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password too short').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Password must contain at least one letter and one number').required('Required'),
});

const Register = () => {
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
        <Typography variant="h5" mb={2}>Register</Typography>
        <Formik
          initialValues={{ username: '', email: '', password: '' }}
          validationSchema={RegisterSchema}
          onSubmit={(values, { setSubmitting }) => {
            const user = {
              ...values,
              role: 'comun'
            };
            api.post('/register', user)
              .then(response => {
                setSubmitting(false);
                alert('Registration successful');
                navigate('/login');
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
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              </Box>
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="password"
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
                Register
              </Button>
              <Button
                variant="text"
                color="primary"
                fullWidth
                onClick={() => navigate('/login')}
              >
                Already have an account? Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Register;
