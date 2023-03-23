import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Special Character"
    ),
});

export const signUpSchema = yup.object({
  username: yup
    .string("Enter your Username")
    .required("Username is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Special Character"
    ),
  confirmPassword: yup.string()
  .test('passwords-match', 'Passwords must match', function(value){
    return this.parent.password === value
  })
});

export const eventValidation = yup.object({
  event_name: yup
    .string("Enter your event name")
    .required("event name is required is required"),
    price: yup
    .string("Enter your price")
    .required("Price is required")
});
