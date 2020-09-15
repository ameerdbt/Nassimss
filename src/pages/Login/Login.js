import React, { useState } from "react";
import "./login.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  return (
    <Formik
      initialValues={{ supervisorEmail: "", supervisorPassword: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("Logging in", values);
          setLoading(true);
          axios
            .post(
              `https://sleepy-wildwood-51098.herokuapp.com/supervisor/login`,
              values
            )
            .then((res) => {
              console.log(res.data);
              const { message } = res.data;
              let user = res.data.user[0];
              // console.log(user);
              localStorage.setItem("token", message);
              localStorage.setItem("user", JSON.stringify(user));
              history.push("/overview", { user: res.data.user[0] });

              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
              setErr(true);
            });
          setSubmitting(false);
        }, 200);
      }}
      validationSchema={Yup.object().shape({
        supervisorEmail: Yup.string().required("Required").email(),
        supervisorPassword: Yup.string()
          .required("No password provided")
          .min(8, "Password is too short - should be 8 chars minimum."),
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
          <div className="login">
            <div className="container">
              <h1>Login to your NASIMS Account</h1>
              <div className="row justify-content-between align-items-center">
                <div className="col-12 col-md-6 login__hero">
                  <span className="my-2 d-block">
                    If you don't have an acount, you can <br />
                    <a href="#register">Register here!</a>
                  </span>
                  <div className="login__wrapper">
                    <div className="login__img"></div>
                  </div>
                </div>
                <div className="col-12 col-md-6 login__form">
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
                  <form onSubmit={handleSubmit}>
                    <div className="form-group my-4">
                      <input
                        name="supervisorEmail"
                        type="email"
                        className="form-control form-control-lg"
                        id="email"
                        placeholder="Enter Email Address"
                        value={values.supervisorEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.supervisorEmail && touched.supervisorEmail && (
                        <div className="input-feedback">
                          {errors.supervisorEmail}
                        </div>
                      )}
                    </div>

                    <div className="form-group my-4">
                      <input
                        type="password"
                        name="supervisorPassword"
                        className="form-control form-control-lg"
                        id="password"
                        placeholder="Enter Password"
                        value={values.supervisorPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.supervisorPassword &&
                        touched.supervisorPassword && (
                          <div className="input-feedback">
                            {errors.supervisorPassword}
                          </div>
                        )}
                    </div>
                    <div className="row justify-content-between mx-0">
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="remember"
                          />
                          <label className="form-check-label" for="remember">
                            Keep me logged in
                          </label>
                        </div>
                      </div>
                      <a href="#recover">Recover Password</a>
                    </div>
                    {loading ? (
                      <button
                        type="submit"
                        disabled
                        class="btn btn--primary w-100"
                      >
                        Loading...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        class="btn btn--primary w-100"
                      >
                        Proceed
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;
