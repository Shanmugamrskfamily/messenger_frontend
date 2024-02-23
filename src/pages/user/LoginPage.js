import { LoginForm } from "../../components/LoginForm";

function LoginPage() {
  
  return (
    <div className=" flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-center mb-5">Let's Connect with RSK Messenger Web Application</h1>
      <div className="bg-white rounded-lg p-5 max-w-md w-full">
        <img src='./images/logo.gif' alt="Messenger App" className="w-full mb-1" />
        <LoginForm />
      </div>
    </div>
  );
}

export { LoginPage };
