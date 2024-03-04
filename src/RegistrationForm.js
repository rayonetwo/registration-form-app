import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import axios from 'axios';

const RegistrationForm = () => {
  const { handleSubmit, control, reset, setError, formState: { errors } } = useForm({
    defaultValues: {
      full_name: '',
      contact_number: '',
      email: '',
      date_of_birth: '',
      password: '',
      confirm_password: '',
    }
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://fullstack-test-navy.vercel.app/api/users/create', data);
      alert(`Success: ${response.data.title}`);
      reset();
    } catch (error) {
      alert(`Error: ${error.response?.data.title || 'Unknown error occurred'}`);
      setError('apiError', { message: error.response?.data.description || 'Unknown error occurred' });
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" gutterBottom>Registration Form</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="full_name"
          control={control}
          rules={{ required: 'Full name is required', pattern: /^[a-zA-Z\s]*$/ }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Full Name"
              variant="outlined"
              error={Boolean(errors.full_name)}
              helperText={errors.full_name?.message}
              fullWidth
              margin="normal"
            />
          )}
        />
        <Controller
          name="contact_number"
          control={control}
          rules={{ required: 'Contact number is required', pattern: /^\(\d{3}\) \d{3}-\d{4}$/ }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Contact Number"
              variant="outlined"
              error={Boolean(errors.contact_number)}
              helperText={errors.contact_number?.message || "Format: (XXX) XXX-XXXX"}
              fullWidth
              margin="normal"
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{ required: 'Email is required', pattern: /^\S+@\S+\.\S+$/ }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              fullWidth
              margin="normal"
            />
          )}
        />
        <Controller
          name="date_of_birth"
          control={control}
          rules={{ required: 'Date of birth is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Date of Birth"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              error={Boolean(errors.date_of_birth)}
              helperText={errors.date_of_birth?.message}
              fullWidth
              margin="normal"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: 'Password is required', minLength: 8, pattern: /^[a-zA-Z0-9]*$/ }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              variant="outlined"
              error={Boolean(errors.password)}
              helperText={errors.password?.message || "Min 8 characters, no special chars"}
              fullWidth
              margin="normal"
            />
          )}
        />
        <Controller
          name="confirm_password"
          control={control}
          rules={{
            required: 'Confirm Password is required',
            validate: value => value === control._formValues.password || "Passwords do not match"
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Confirm Password"
              type="password"
              variant="outlined"
              error={Boolean(errors.confirm_password)}
              helperText={errors.confirm_password?.message}
              fullWidth
              margin="normal"
            />
          )}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>Submit</Button>
        {errors.apiError && <Alert severity="error">{errors.apiError.message}</Alert>}
      </form>
    </Container>
  );
};

export default RegistrationForm;
