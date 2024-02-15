import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { appContext } from "../App";
import { CustomLoadingButton } from "../components/customLoadingButton.js";

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
      toast.warning("Empty fields");
    } else {
      const fetchResponse = await fetch(
        `${process.env.REACT_APP_SERVER_API}/user/login`,
        {
          method: "POST",
          body: JSON.stringify(formValues),
          headers: { "Content-Type": "application/json" },
        }
      );
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
      <form className='login-form' onSubmit={handleSubmit}>
      <h1 className="text-4xl text-center mb-4">Login</h1>
      <div className="mb-5">
        <TextField
          fullWidth
          name="email"
          value={values.email}
          error={!!errors.email}
          label="Email"
          helperText={errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          
        />
        </div>
        <div className="mb-5">
        <TextField
          fullWidth
          name="password"
          value={values.password}
          error={touched.password ? !!errors.password : false}
          label="Password"
          helperText={errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        </div>
        <CustomLoadingButton
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          buttonComponent={
            <Button type="submit" variant="contained" className="w-full">
              Login
            </Button>
          }
        />
        <div className="mt-4 flex justify-between">
          <Link className='text-blue-700 underline' to="/forgot">Forgot Password?</Link>
          <Link className='text-blue-700 underline' to="/signup">New User? Signup</Link>
        </div>
        <div className="mt-4">
          <Button
            color="success"
            variant="contained"
            className="w-full"
            onClick={() =>
              login({ email: "user1@gmail.com", password: "12345678" })
            }
          >
            Demo User1
          </Button>
          </div>
          <div className="mt-4">
          <Button
            variant="contained"
            color="secondary"
            className="w-full mt-5"
            onClick={() =>
              login({ email: "user2@gmail.com", password: "87654321" })
            }
          >
            Demo User2
          </Button>
        </div>
      </form>
  );
}

export { LoginForm };
