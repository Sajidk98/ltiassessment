import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import "../Login/style.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

import { signUpSchema } from "../../utils/validation";

export default function SignUp() {
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: ""
  };

  const formik = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      console.log({ values });
      //submit the form here
    },
  });

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
        <div className="field-container">
          <TextField
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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