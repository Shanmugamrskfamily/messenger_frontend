import ForgotPasswordForm from "../../components/ForgotPasswordForm";

function ForgotPage() {
  const forgotPageImage =
    "https://static.vecteezy.com/system/resources/previews/000/561/500/original/chat-app-logo-icon-vector.jpg";
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-center mb-8">Let's Change your Credentials</h1>
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <img src={forgotPageImage} alt="chat app logo" className="w-full mb-8" />
        <ForgotPasswordForm/>
      </div>
    </div>
  );
}

export { ForgotPage };
