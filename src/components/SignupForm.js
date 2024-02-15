import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Link } from "react-router-dom";

function SignupForm() {
  const loginFormInitialValuesObj = {
    name: "",
    mobile: "",
    email: "",
    password: "",
    cpassword: "",
  };

  const loginFormYupValidateObj = yup.object({
    name: yup.string().min(3),
    mobile: yup
      .number()
      .test("len", "exact 10 digits", (val) =>
        val ? val.toString().length === 10 : null
      ),
    email: yup.string().email(),
    password: yup.string().min(8),
    cpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: loginFormInitialValuesObj,
      validationSchema: loginFormYupValidateObj,
      onSubmit: (formValues) => signUp(formValues),
    });

  const signUp = async (formValues) => {
    const isAnyEmptyFields = Object.keys(formValues).some(
      (key) => formValues[key] === ""
    );
    if (isAnyEmptyFields) {
      toast.warning("Empty fields");
    } else {
      const fetchResponse = await fetch(
        `${process.env.REACT_APP_SERVER_API}/user/signup`,
        {
          method: "POST",
          body: JSON.stringify(formValues),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (fetchResponse.status === 200) {
        const data = await fetchResponse.json();
        toast.success(data.message);
      } else {
        const data = await fetchResponse.json();
        toast.error(data.message);
      }
    }
  };

  return (
    <>
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="text-center text-4xl mb-4">User Registration</h2>
        <div className="mb-4">
        <TextField
          fullWidth
          name="name"
          value={values.name}
          error={!!errors.name}
          label="Name"
          helperText={errors.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        </div>
        <div className="mb-4">
        <TextField
          fullWidth
          name="mobile"
          value={values.mobile}
          error={!!errors.mobile}
          label="Mobile"
          helperText={errors.mobile}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        </div>
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
        <TextField
          fullWidth
          name="cpassword"
          value={values.cpassword}
          error={touched.cpassword ? !!errors.cpassword : false}
          label="Confirm Password"
          helperText={errors.cpassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        </div>
        <div className="mb-4">
        <Button type="submit" variant="contained" className="w-full mb-4">
          Register
        </Button>
        </div>
        <div className="mb-4 flex justify-between">
          <Link className='text-blue-700 underline' to="/forgot">Forgot Password?</Link>
          <Link className='text-blue-700 underline' to="/">Have an Account? Login</Link>
        </div>
      </form>
    </>
  );
}

export { SignupForm };
