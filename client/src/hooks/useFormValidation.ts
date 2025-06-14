import { useState } from 'react';

interface FormErrors {
  [key: string]: string;
}

export function useFormValidation() {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (field: string, value: string) => {
    let error = '';

    switch (field) {
      case 'businessName':
        if (value.length < 2) {
          error = 'Business name must be at least 2 characters';
        }
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!/^\+?[\d\s-]{10,}$/.test(value)) {
          error = 'Please enter a valid phone number';
        }
        break;
    }

    setErrors(prev => ({
      ...prev,
      [field]: error
    }));

    return !error;
  };

  const validateForm = () => {
    // Add form-wide validation if needed
    return Object.keys(errors).length === 0;
  };

  return {
    errors,
    validateField,
    validateForm
  };
}