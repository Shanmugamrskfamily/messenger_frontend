import { SignupForm } from "../../components/SignupForm";

function SignupPage() {
  const signupPageImage =
    "https://static.vecteezy.com/system/resources/previews/000/561/500/original/chat-app-logo-icon-vector.jpg";
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-center mb-8">Let's Register with Chat App</h1>
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <img src={signupPageImage} alt="chat app logo" className="w-full mb-8" />
        <SignupForm />
      </div>
    </div>
  );
}

export { SignupPage };
