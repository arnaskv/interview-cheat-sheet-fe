import * as yup from 'yup';

export const userRegisterSchema = yup.object({
    name: yup.string()
        .required('Name is required'),
    surname: yup.string()
        .required('Surname is required'),
    email: yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: yup.string()
        .min(7, 'Password must be at least 6 characters')
        .required('Password is required'),
    passwordRepeat: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Passwords must match')
  });
