import { SignupForm } from "../../components/SignupForm";

function SignupPage() {
  
  return (
    <div className=" min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-center mb-1">Let's Register with RSK Messenger Web Application</h1>
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <img src='./images/logo.gif' alt="chat app logo" className="w-full mb-8" />
        <SignupForm />
      </div>
    </div>
  );
}

export { SignupPage };
