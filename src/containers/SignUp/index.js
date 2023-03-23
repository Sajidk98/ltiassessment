import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import "../Login/style.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { signUpSchema } from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/userReducer";

export default function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector(state => state.user)
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    username:""
  };

  const formik = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      dispatch(addUser({email: values.email, password: values.password, username: values.username}))
      navigate('/')
    },
  });

  return (
    <>
    <div style={{flex:1}}></div>
    <div style={{flex:1}}>
      <form onSubmit={formik.handleSubmit}>
      <div className="field-container">
          <TextField
            fullWidth
            label="User Name"
            variant="outlined"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </div>
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
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <div className="field-container">
          <TextField
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
        </div>
        <div className="field-container button-container">
          <Button type="submit" variant="contained">
            SignUp
          </Button>
          <Link style={{marginLeft: 8}} to='/login'>Login</Link>
        </div>
      </form>
    </div>
    <div style={{flex:1}}></div>
    </>
  );
}