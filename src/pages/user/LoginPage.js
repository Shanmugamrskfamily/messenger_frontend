import { LoginForm } from "../../components/LoginForm";

function LoginPage() {
  const loginPageImage =
    "https://static.vecteezy.com/system/resources/previews/000/561/500/original/chat-app-logo-icon-vector.jpg";
  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-center mb-5">Let's Connect with RSK Messenger Web Application</h1>
      <div className="bg-white rounded-lg p-5 max-w-md w-full">
        <img src={loginPageImage} alt="Messenger App" className="w-full mb-5" />
        <LoginForm />
      </div>
    </div>
  );
}

export { LoginPage };
