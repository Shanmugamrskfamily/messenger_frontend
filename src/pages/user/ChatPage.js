import { useContext, useEffect } from "react";
import { Header } from "../../components/Header";
import { ConversationRoom } from "../../components/ConversationRoom";
import { ChatRoomsList } from "../../components/ChatRoomsList";
import { useNavigate } from "react-router-dom";
import { appContext } from "../../App";

function ChatPage() {
  const navigate = useNavigate();
  const { selectedRoom, socket, setUsers, currentUser } = useContext(appContext);

  useEffect(() => {
    const token = localStorage.getItem('logintoken');
    if (!token) {
      navigate('/');
    }
  }, [navigate]); 

  useEffect(() => {
    socket.emit("new_user", currentUser.email);
    socket.on("updated_users", (data) => {
      setUsers(data);
    });

    return () => {
      socket.off("updated_users");
    };
  }, [socket, setUsers, currentUser]);

  return (
    <div className="container min-h-screen">
          {selectedRoom ? (
            <>
            <Header/>
            <ConversationRoom />
            </>
          ) : (
            <>
              <Header />
              <ChatRoomsList />
            </>
          )}
    </div>
  );
}

export { ChatPage };
