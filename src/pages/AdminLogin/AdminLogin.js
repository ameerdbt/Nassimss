import React, { Component, useState } from "react";
import logo from "../../assets/Group.svg";
import "./AdminLogin.scss";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

const AdminLogin = () => {
  let history = useHistory();
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Formik
      initialValues={{ userName: "", userPassword: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("Logging in", values);
          setLoading(true);
          axios
            .post(
              `https://sleepy-wildwood-51098.herokuapp.com/schemes/login`,
              values
            )
            .then((res) => {
              console.log(res);
              console.log(res.data);
              let { message, full_name } = res.data.user;
              console.log(message, full_name);
              localStorage.setItem("token", message);
              localStorage.setItem("user", full_name);

              setLoading(false);
              history.push("/dashboard");
            })
            .catch((err) => {
              console.log(err);
              setErr(true);
              setLoading(false);
            });
          setSubmitting(false);
        }, 500);
      }}
      validationSchema={Yup.object().shape({
        userName: Yup.string().required("Required").email(),
        userPassword: Yup.string()
          .required("No password provided.")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/(?=.*[0-9])/, "Password must contain a number."),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className="account-page">
            <div className="main-wrapper">
              <div className="account-content">
                <div className="container">
                  <div className="account-logo">
                    <a href="index.html">
                      <img src={logo} alt="Nassims" />
                    </a>
                  </div>
                  {err ? (
                    <div
                      class="alert alert-danger alert-dismissible fade show"
                      role="alert"
                    >
                      <strong>ERROR!</strong> Email or Password is wrong.
                      <button
                        type="button"
                        class="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <div className="account-box">
                    <div className="account-wrapper">
                      <h3 className="account-title">Login</h3>

                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label className="email">Email </label>
                          <input
                            name="userName"
                            type="text"
                            placeholder="emekaokafor@gmail.com"
                            value={values.userName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.userName && touched.userName && "error"
                            }
                            className="form-control"
                          />
                          {errors.userName && touched.userName && (
                            <div className="input-feedback">
                              {errors.userName}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col">
                              <label className="password">Password</label>
                            </div>
                            <div className="col-auto">
                              <a className="forgotPassword" href="#">
                                Forgot password?
                              </a>
                            </div>
                          </div>
                          <input
                            name="userPassword"
                            type="password"
                            placeholder="Enter your password"
                            value={values.userPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.userPassword &&
                              touched.userPassword &&
                              "error"
                            }
                            className="form-control"
                          />
                          {errors.userPassword && touched.userPassword && (
                            <div className="input-feedback">
                              {errors.userPassword}
                            </div>
                          )}
                        </div>
                        <div className="form-group text-center">
                          {loading ? (
                            <button
                              className="btn account-btnLoading"
                              disabled
                              type="submit"
                            >
                              Loading...
                            </button>
                          ) : (
                            <button
                              className="btn account-btn"
                              disabled={isSubmitting}
                              type="submit"
                            >
                              Login
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default AdminLogin;
