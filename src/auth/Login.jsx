import React, { useState } from "react";

import logo from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";



function Login() {
   const [form,setForm]=useState({email:'',password:''})
   const {login}=useAuth()
   const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res=await loginUser(form)
      login(res.data)
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    
  };
  return (
    <div id="wrapper" className="login-page">
      <div className="login-section">
        <div className="login-inner-column">
          <div className="row">
            <div className="col-12 text-center">
              <div className="login-logo">
                <img src={logo} alt="logo" title="Logo" />
              </div>
            </div>
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <fieldset className="row">
                  <div className="col-12 form-group">
                    <label htmlFor="email-address" className="fw-semibold">
                      Email Address
                    </label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="Enter Your Email Address"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 form-group">
                    <label htmlFor="password" className="fw-semibold">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter Your Password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 round-checkbox">
                    <label className="custom-checkbox fw-medium mb-0">
                      Remember me
                      <input type="checkbox" className="child-checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="col-12 form-group">
                    <button className="btn main-btn w-100">Login</button>
                  </div>
                  <div className="col-12 form-group">
                    <p className="m-0 d-flex flex-wrap justify-content-center gap-1">
                      <a href="#" className="basic-links dark-links fw-bold">
                        Forgot Password?
                      </a>
                      <span className="fw-medium">
                        Click here to recover password
                      </span>
                    </p>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
