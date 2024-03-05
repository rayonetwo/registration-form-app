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

  const formFields = [
    { name: 'full_name', label: 'Full Name', rules: { required: 'Full name is required', pattern: /^[a-zA-Z\s]*$/ } },
    { name: 'contact_number', label: 'Contact Number', rules: { required: 'Contact number is required', pattern: /^\(\d{3}\) \d{3}-\d{4}$/ }, helperText: "Format: (XXX) XXX-XXXX" },
    { name: 'email', label: 'Email', rules: { required: 'Email is required', pattern: /^\S+@\S+\.\S+$/ } },
    { name: 'date_of_birth', label: 'Date of Birth', type: 'date', rules: { required: 'Date of birth is required' } },
    { name: 'password', label: 'Password', type: 'password', rules: { required: 'Password is required', minLength: 8, pattern: /^[a-zA-Z0-9]*$/ }, helperText: "Min 8 characters, no special chars" },
    { name: 'confirm_password', label: 'Confirm Password', type: 'password', rules: { required: 'Confirm Password is required', validate: value => value === control._formValues.password || "Passwords do not match" } },
  ];

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
        {formFields.map(({ name, label, rules, type = 'text', helperText }) => (
          <Controller
            key={name}
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
              <TextField
                {...field}
                label={label}
                type={type}
                variant="outlined"
                error={Boolean(errors[name])}
                helperText={errors[name]?.message || helperText}
                fullWidth
                margin="normal"
                InputLabelProps={type === 'date' ? { shrink: true } : undefined}
              />
            )}
          />
        ))}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>Submit</Button>
        {errors.apiError && <Alert severity="error">{errors.apiError.message}</Alert>}
      </form>
    </Container>
  );
};

export default RegistrationForm;
