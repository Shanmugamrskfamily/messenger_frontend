import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import "./Forms.css";
import { Link } from "react-router-dom";
import { useState } from "react";
function ForgotForm() {
  const [isVerfiedUser, setIsVerifiedUser] = useState(false);
  const forgotFormInitialValuesObj = { email: "" };

  const forgotFormYupValidateObj = yup.object({
    email: yup.string().email(),
  });

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: forgotFormInitialValuesObj,
      validationSchema: forgotFormYupValidateObj,
      onSubmit: (formValues) => {
        isVerfiedUser ? sendLink(formValues) : verifyUserEmail(formValues);
      },
    });

  const sendLink = async (formValues) => {
    const isAnyEmptyFields = Object.keys(formValues).some(
      (key) => formValues[key] === ""
    );
    if (isAnyEmptyFields) {
      toast.warning("empty fileds");
    } else {
      const fetchResponse = await fetch(
        `${process.env.REACT_APP_SERVER_API}/user/reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            email: formValues.email,
          },
        }
      );
      const data = await fetchResponse.json();

      if (
        data.message ===
        "Click on Reset Password link has been sent to your email"
      ) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
  };

  const verifyUserEmail = async (formValues) => {
    const isAnyEmptyFields = Object.keys(formValues).some(
      (key) => formValues[key] === ""
    );
    if (isAnyEmptyFields) {
      toast.warning("empty fileds 1");
    } else {
      const fetchResponse = await fetch(
        `${process.env.REACT_APP_SERVER_API}/user/verifyEmail`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            email: formValues.email,
          },
        }
      );
      const data = await fetchResponse.json();
      if (data.message === "User Exist") {
        setIsVerifiedUser(true);
        toast.success(data.message);
      } else {
        setIsVerifiedUser(false);
        toast.error(data.message);
      }
    }
  };
  return (
    <>
      <form className="forgot-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Forgot Form</h2>
        <TextField
          name="email"
          value={values.email}
          error={!!errors.email}
          label="Email"
          helperText={errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isVerfiedUser}
        />

        {isVerfiedUser ? (
          <Button
            type={isVerfiedUser ? "submit" : "button"}
            color="secondary"
            variant="contained"
            onClick={sendLink}
          >
            send Reset Link
          </Button>
        ) : (
          <Button
            type={!isVerfiedUser ? "submit" : "button"}
            variant="contained"
            onClick={verifyUserEmail}
          >
            verify
          </Button>
        )}
        <div className="other-links">
          <Link to="/">Login?</Link>
          <Link to="/signup">New? Signup</Link>
        </div>
      </form>
      {/* <p>touched {JSON.stringify(touched)}</p>

      <p>errors {JSON.stringify(errors)}</p>

      <p>values {JSON.stringify(values)}</p> */}
    </>
  );
}

export { ForgotForm };
