import { LoginForm } from "../../components/LoginForm";
import "./LoginPage.css";

function LoginPage() {
  const loginPageImage =
    "https://static.vecteezy.com/system/resources/previews/000/561/500/original/chat-app-logo-icon-vector.jpg";
  return (
    <div className="page login-page">
      <h1 className="app-title text-center">Let's Chat with Chat App</h1>
      <div className="body-sections">
        <img src={loginPageImage} alt="chat app logo" />
        <LoginForm />
      </div>
    </div>
  );
}

export { LoginPage };
