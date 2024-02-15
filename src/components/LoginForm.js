import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import "./Forms.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { appContext } from "../App";
import { CustomLoadingButton } from "./customLoadingButton";
function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, setCurrentUser, socket } = useContext(appContext);
  const navigate = useNavigate();
  const loginFormInitialValuesObj = { email: "", password: "" };

  const loginFormYupValidateObj = yup.object({
    email: yup.string().email(),
    password: yup.string().min(8),
  });

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: loginFormInitialValuesObj,
      validationSchema: loginFormYupValidateObj,
      onSubmit: (formValues) => login(formValues),
    });

  const login = async (formValues) => {
    setIsLoading(true);
    const isAnyEmptyFields = Object.keys(formValues).some(
      (key) => formValues[key] === ""
    );
    if (isAnyEmptyFields) {
      toast.warning("empty fileds");
    } else {
      // console.log("form values", formValues);
      const fetchResponse = await fetch(
        `${process.env.REACT_APP_SERVER_API}/user/login`,
        {
          method: "POST",
          body: JSON.stringify(formValues),
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log("fetch Response login", fetchResponse);
      if (fetchResponse.status === 200) {
        setIsLoading(false);
        const data = await fetchResponse.json();
        localStorage.setItem("logintoken", data.payload.token);
        localStorage.setItem("chatEmail", data.payload.email);
        setCurrentUser({ email: data.payload.email });
        toast.success(data.message);
        navigate("/user");
      } else {
        setIsLoading(false);
        const data = await fetchResponse.json();
        toast.error(data.message);
      }
    }
  };
  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Login Form</h2>
        <TextField
          name="email"
          value={values.email}
          error={!!errors.email}
          label="Email"
          helperText={errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          name="password"
          value={values.password}
          error={touched.password ? !!errors.password : false}
          label="Password"
          helperText={errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <CustomLoadingButton
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          buttonComponent={
            <Button type="submit" variant="contained">
              Login
            </Button>
          }
        />
        <div className="other-links">
          <Link to="/forgot">Forgot?</Link>
          <Link to="/signup">New? Signup</Link>
        </div>
        <div className="other-links">
          <Button
            color="success"
            variant="contained"
            onClick={() =>
              login({ email: "user1@gmail.com", password: "12345678" })
            }
          >
            Demo User1
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              login({ email: "user2@gmail.com", password: "12345678" })
            }
          >
            Demo User2
          </Button>
        </div>
      </form>
      {/* <p>touched {JSON.stringify(touched)}</p>

      <p>errors {JSON.stringify(errors)}</p>

      <p>values {JSON.stringify(values)}</p> */}
    </>
  );
}

export { LoginForm };
