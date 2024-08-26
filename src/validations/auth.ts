import { object, string } from 'yup';

export const LOGIN_SCHEMA = object({
  email: string().required("Email address is required").email("Invalid email address"),
  password: string().required("Password is required"),
});
