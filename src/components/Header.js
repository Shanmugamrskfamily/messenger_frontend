import "../pages/user/chat.css";
import SettingsPowerRoundedIcon from "@mui/icons-material/SettingsPowerRounded";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("logintoken");
    navigate("/");
  };
  return (
    <div className="chat-header header">
      <img
        style={{ borderRadius: "50%" }}
        src="https://i.ibb.co/QDkbTJK/schat-app-logo-icon-vector.png"
        alt="chat-logo"
      />
      <IconButton sx={{ color: "white" }} aria-label="log out" onClick={logout}>
        <SettingsPowerRoundedIcon />
      </IconButton>
    </div>
  );
}

export { Header };
