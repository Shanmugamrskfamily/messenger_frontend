import React, { Fragment, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ForgetPasswordRequest } from "../APIrequests/AuthRequest";
import { ErrorToast, IsEmail } from "../Helper/FormHelper";

const ForgetPassword = () => {
  let email = useRef();
  const navigate = useNavigate();

  const onSend = async () => {
    if (email.value) {
      if (IsEmail(email.value)) {
        ErrorToast("Invalid email address.");
      } else {
        await ForgetPasswordRequest(email.value).then((result) => {
          if (result) navigate("/");
        });
      }
    }
  };
  return (
    <Fragment>
      <section className="bg-gray-50 log-sign-bg">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
          >
            <img
              src="/icon.png"
              alt="swastic"
              style={{ width: "3.5rem", marginRight: "4px" }}
            />
            Chat2Swastic
          </a>
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Forgot Your Password?
              </h1>
              <p className="mb-4 text-sm text-gray-700 ">
                We get it, stuff happens. Just enter your email address below
                and we'll send you a mail to reset your password.
              </p>
              <div className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    ref={(i) => (email = i)}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#6c2fa8] focus:border-[#6c2fa8] block w-full p-2.5 "
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <button
                  onClick={onSend}
                  type="submit"
                  className="w-full text-white bg-[#6c2fa8] hover:bg-[#9333ea] focus:ring-4 focus:outline-none focus:ring-[#a855f7] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Send Password Reset Mail
                </button>
                <p className="text-sm font-light text-gray-500 ">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-[#6c2fa8] hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ForgetPassword;
