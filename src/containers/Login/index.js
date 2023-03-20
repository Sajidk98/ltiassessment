import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import "./style.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useSelector, useDispatch } from 'react-redux';

import { loginSchema } from "../../utils/validation";
import { addUser, selectUser } from "../../redux/userReducer";

export default function Login() {

    const user = useSelector(selectUser);
     const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
     dispatch(addUser(values))
      
    },
  });


  console.log({user})

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="field-container">
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div className="field-container">
          <TextField
            fullWidth
            name="password"
            label="password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <div className="field-container button-container">
          <Button type="submit" variant="contained">
            Login
          </Button>
          <Link to="/signup">SignUp</Link>
        </div>
      </form>
    </div>
  );
}
