import ForgotPasswordForm from "../../components/ForgotPasswordForm";

function ForgotPage() {
  
  return (
    <div className=" min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-center mb-8">Let's Change your Credentials</h1>
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <img src='./images/logo.gif' alt="chat app logo" className="w-full mb-2" />
        <ForgotPasswordForm/>
      </div>
    </div>
  );
}

export { ForgotPage };
