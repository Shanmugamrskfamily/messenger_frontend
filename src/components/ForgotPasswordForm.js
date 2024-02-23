import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_API}/user/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        toast.success("Password reset link sent to your email");
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-2">
        <label htmlFor="email" className="block text-black font-medium">
          Email
        </label>
        <input
        type='email'
          name="email"
          className="w-full mt-2"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter Your Email"
          required
          
        />

        {/* <input
          id="email"
          type="email"
          className="mt-1 block w-full  rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={email}
          onChange={handleEmailChange}
          required
        /> */}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Reset Password
      </button>
      <div className="text-blue-700 underline flex justify-between">
          <Link to="/">Login?</Link>
          <Link to="/signup">New? Signup</Link>
        </div>
    </form>
  );
}

export default ForgotPasswordForm;
