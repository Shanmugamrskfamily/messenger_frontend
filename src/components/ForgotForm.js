import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useState } from "react";

function ForgotForm() {
  const [isVerifiedUser, setIsVerifiedUser] = useState(false);
  const forgotFormInitialValuesObj = { email: "" };

  const forgotFormYupValidateObj = yup.object({
    email: yup.string().email(),
  });

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: forgotFormInitialValuesObj,
      validationSchema: forgotFormYupValidateObj,
      onSubmit: (formValues) => {
        isVerifiedUser ? sendLink(formValues) : verifyUserEmail(formValues);
      },
    });

  const sendLink = async (formValues) => {
    const isAnyEmptyFields = Object.keys(formValues).some(
      (key) => formValues[key] === ""
    );
    if (isAnyEmptyFields) {
      toast.warning("Empty fields");
    } else {
      const fetchResponse = await fetch(
        `${process.env.REACT_APP_SERVER_API}/user/forgot-password`,
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
      toast.warning("Empty fields");
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
        <h2 className="form-title text-4xl text-center mb-4">Forgot Password</h2>
        <div className='mb-4'>
        <TextField
          fullWidth
          name="email"
          value={values.email}
          error={!!errors.email}
          label="Email"
          helperText={errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isVerifiedUser}
        />
        </div>
        {isVerifiedUser ? (
          <div className='mb-4'>
          <Button
            type={isVerifiedUser ? "submit" : "button"}
            variant="contained"
            color="secondary"
            onClick={sendLink}
          >
            Send Reset Link
          </Button>
          </div>
        ) : (
          <div className='mb-4'>
          <Button
            type={!isVerifiedUser ? "submit" : "button"}
            variant="contained"
            className="w-full"
            onClick={verifyUserEmail}
          >
            Verify
          </Button>
          </div>
        )}
        <div className="text-blue-700 underline flex justify-between">
          <Link to="/">Login?</Link>
          <Link to="/signup">New? Signup</Link>
        </div>
      </form>
    </>
  );
}

export { ForgotForm };
