import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("logintoken");
    localStorage.removeItem("chatEmail");
    navigate("/");
  };

  return (
    <div className=" text-white flex justify-between items-center px-4 py-2">
      <img
        src='./images/logo.gif'
        alt="chat-logo"
        className="rounded-full h-12 w-12"
      />
      <div className="">
      <button className="ml-4 mr-2" onClick={logout}>
        Logout <LogoutIcon/>
      </button>
      
      </div>
    </div>
  );
}

export { Header };
