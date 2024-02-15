import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("logintoken");
    localStorage.removeItem("chatEmail");
    navigate("/");
  };

  return (
    <div className="bg-blue-500 text-white flex justify-between items-center px-4 py-2">
      <img
        src="https://i.ibb.co/QDkbTJK/schat-app-logo-icon-vector.png"
        alt="chat-logo"
        className="rounded-full h-12 w-12"
      />
      <button className="ml-4" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export { Header };
