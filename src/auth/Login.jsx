import React, { useEffect, useState } from "react";
// import './login.css'
import logo from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

import Cookies from "js-cookie";
import { decrypt, encrypt } from "../utils/crypto"; 

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const remember = Cookies.get("remember");

    if (remember === "true") {
      setValue("remember", true);

      setValue("email", decrypt(Cookies.get("email") || ""));
      setValue("password", decrypt(Cookies.get("password") || ""));
    }
  }, [setValue]);

  const onSubmit = async (data) => {
  try {
    const res = await loginUser(data);

    login(res.data);

    if (data.remember) {
      Cookies.set("remember", "true", { expires: 30 });
      Cookies.set("email", encrypt(data.email), { expires: 30 });
      Cookies.set("password", encrypt(data.password), { expires: 30 });
    } else {
      Cookies.set("remember", "false", { expires: 30 });
      Cookies.remove("email");
      Cookies.remove("password");
    }

    window.location.href = "/";
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="row">
                  <div className="col-12 form-group">
                    <label htmlFor="email" className="fw-semibold">
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="Enter Your Email Address"
                      {...register("email", {
                        setValueAs: (value) => value?.trim(),

                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                    />

                    <div className="invalid-feedback">
                      {errors.email?.message}
                    </div>
                  </div>

                  <div className="col-12 form-group">
                    <label htmlFor="password" className="fw-semibold">
                      Password
                    </label>

                    <div className="input-group">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        placeholder="Enter Your Password"
                        {...register("password", {
                          setValueAs: (value) => value?.trim(),
                          required: "Password is required",
                        })}
                      />

                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i
                          className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                        ></i>
                      </button>
                    </div>

                    <div className="invalid-feedback d-block">
                      {errors.password?.message}
                    </div>
                  </div>

                  <div className="col-12 round-checkbox">
                    <label className="custom-checkbox fw-medium mb-0">
                      Remember me
                      <input
                        type="checkbox"
                        className="child-checkbox"
                        {...register("remember")}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>

                  <div className="col-12 form-group">
                    <button
                      type="submit"
                      className="btn main-btn w-100"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Logging in..." : "Login"}
                    </button>
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
