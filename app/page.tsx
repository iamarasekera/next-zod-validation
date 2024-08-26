// src/pages/login.tsx
"use client";
import React, { useState } from 'react';
import { validateFormData } from '../utils/validation.ts'; // Import the validation function
import { schemaLogin } from '../schemas/login.schema'; // Import the Zod validation schema

// Define the shape of the form data
type FormData = {
  email: string;
  password: string;
};

// Define the shape of the error messages
type Errors = {
  email?: string;
  password?: string;
};

const LoginPage = () => {
  // State to store form data
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  // State to store validation error messages
  const [errors, setErrors] = useState<Errors>({});

  // Handle changes in input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Update the relevant field based on the input name
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Validate form data using the validation function and schema
    const { errors, data } = validateFormData(schemaLogin, formData);

    if (errors) {
      // If there are validation errors, update the errors state
      setErrors(errors);
    } else {
      // If validation is successful, clear errors and log the valid data
      setErrors({});
      console.log('Form data is valid:', data);
      // Proceed with form submission logic (e.g., API request)
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '300px' }} noValidate>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email} // Bind input value to form data
            onChange={handleChange} // Handle changes in input field
            style={{ width: '100%', padding: '8px', marginTop: '8px' }}
          />
          {errors.email && <p style={{ color: 'red', marginTop: '4px' }}>{errors.email}</p>} {/* Display email error message */}
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password} // Bind input value to form data
            onChange={handleChange} // Handle changes in input field
            style={{ width: '100%', padding: '8px', marginTop: '8px' }}
          />
          {errors.password && <p style={{ color: 'red', marginTop: '4px' }}>{errors.password}</p>} {/* Display password error message */}
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
