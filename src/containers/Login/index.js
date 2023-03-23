import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import { loginSchema } from "../../utils/validation";
import { addUser, selectUser } from "../../redux/userReducer";

export default function Login() {
  const users = useSelector((state) => state.users.users);
  const [error, setError] = useState()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setError(null)
      const currentIndex = users.findIndex((item) => {
        return item.email == values.email && item.password == values.password;
      });
      if (currentIndex >= 0) {
        localStorage.setItem("user", users[currentIndex].id);
        navigate("/");
      } else {
        setError("Incorrect username or password");
      }
    },
  });

  return (
    <>
      <div style={{ flex: 1 }}></div>
      <div style={{ flex: 1, marginTop: 32 }}>
       {error&& <span style={{color: "red"}} >{error}</span>}
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
              type="password"
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
            <Link style={{ marginLeft: 8 }} to="/signup">
              SignUp
            </Link>
          </div>
        </form>
      </div>
      <div style={{ flex: 1 }}></div>
    </>
  );
}
