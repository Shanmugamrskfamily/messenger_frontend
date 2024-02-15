import { SignupForm } from "../../components/SignupForm";

function SignupPage() {
  const signupPageImage =
    "https://static.vecteezy.com/system/resources/previews/000/561/500/original/chat-app-logo-icon-vector.jpg";
  return (
    <div className="page signup-page">
      <h1 className="app-title text-center">Let's Register with Chat App</h1>
      <div className="body-sections">
        <img src={signupPageImage} alt="chat app logo" />
        <SignupForm />
      </div>
    </div>
  );
}

export { SignupPage };
