import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from "./containers/SignUp";
import Home from "./containers/Home";
import Login from "./containers/Login";
import PrivateRoutes from "./utils/protectedRoute";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Provider store={store}>
      <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
                <Route element={<Home/>} path="/" exact/>
            </Route>
            <Route element={<Login/>} path="/login"/>
            <Route element={<SignUp/>} path="/signup"/>
          </Routes>
      </Router>
      </Provider>
    </div>
  );
}

export default App;
