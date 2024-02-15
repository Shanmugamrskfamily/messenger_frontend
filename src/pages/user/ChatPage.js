import { useContext, useEffect, useState } from "react";
import { appContext, socket } from "../../App";
import { Header } from "../../components/Header";
import { ConversationRoom } from "../../components/ConversationRoom";
import { ChatRoomsList } from "../../components/ChatRoomsList";
import { useNavigate } from "react-router-dom";
function ChatPage() {
  const navigate=useNavigate();
  
  useEffect(()=>{
    const token=localStorage.getItem('logintoken');
    if(!token){
      navigate('/');
    }
  },[])


  const {
    selectedRoom,
    setSelectedRoom,
    socket,
    users,
    setUsers,
    currentUser,
  } = useContext(appContext);

  useEffect(() => {
    socket.emit("new_user", currentUser.email);
    socket.on("updated_users", (data) => {
      setUsers(data);
    });
  }, [socket]);
  return (
    <>
      <div className="page chat-page-container">
        <div className="mobile-chat-page">
          {selectedRoom ? (
            <ConversationRoom />
          ) : (
            <>
              <Header />
              <ChatRoomsList />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export { ChatPage };
