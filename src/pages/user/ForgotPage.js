import { ForgotForm } from "../../components/ForgotForm";

function ForgotPage() {
  const forgotPageImage =
    "https://static.vecteezy.com/system/resources/previews/000/561/500/original/chat-app-logo-icon-vector.jpg";
  return (
    <div className="page signup-page">
      <h1 className="app-title text-center">Let's Change your Credentials</h1>
      <div className="body-sections">
        <img src={forgotPageImage} alt="chat app logo" />
        <ForgotForm />
      </div>
    </div>
  );
}

export { ForgotPage };
