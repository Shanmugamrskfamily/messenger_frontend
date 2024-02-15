import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";

import { Routes, Route } from "react-router-dom";
import { SignupPage } from "./pages/user/SignupPage";
import { ForgotPage } from "./pages/user/ForgotPage";
import { LoginPage } from "./pages/user/LoginPage";
import { ToastContainer } from "react-toastify";
import { createContext, useEffect, useRef, useState } from "react";
import { ChatPage } from "./pages/user/ChatPage";
import { io } from "socket.io-client";
export const socket = io(process.env.REACT_APP_SERVER_API);

export const appContext = createContext();

function App() {
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [roomMessages, setRoomMessages] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 720 ? true : false
  );
  const appContextObj = {
    newMessage,
    setNewMessage,
    currentUser,
    setCurrentUser,
    roomMessages,
    setRoomMessages,
    socket,
    users,
    setUsers,
    selectedRoom,
    setSelectedRoom,
    isMobile,
  };

  function handleResize() {
    window.innerWidth < 720 ? setIsMobile(true) : setIsMobile(false);
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <div className="App">
      <ToastContainer theme="light" autoClose={3000} />
      <appContext.Provider value={appContextObj}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot" element={<ForgotPage />} />
          <Route path="/user" element={<ChatPage />} />
        </Routes>
      </appContext.Provider>
    </div>
  );
}

export default App;
