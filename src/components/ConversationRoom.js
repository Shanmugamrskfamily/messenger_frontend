import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { appContext, socket } from "../App.js";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function ConversationRoom() {
  const navigate=useNavigate();
  
  useEffect(()=>{
    const token=localStorage.getItem('logintoken');
    if(!token){
      navigate('/');
    }
  },[navigate])

  const {
    currentUser,
    users,
    roomMessages,
    setRoomMessages,
    newMessage,
    setNewMessage,
    selectedRoom,
    setSelectedRoom,
  } = useContext(appContext);
  const [currentRoom, setCurrentRoom] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    // console.log("trying to send", currentMessage);
    if (currentMessage) {
      socket.emit("message_room", {
        from: currentUser.email,
        to: selectedRoom,
        content: currentMessage,
        createAt: Date.now(),
      });
      setCurrentMessage("");
    } else {
      return;
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const updateRoomMessages = async (selectedRoom) => {
    const messageRes = await fetch(
      `${process.env.REACT_APP_SERVER_API}/roomMessages`,
      {
        headers: { selectedroom: selectedRoom },
      }
    );
    // console.log("got Resp", messageRes);
    if (messageRes.status === 200) {
      const data = await messageRes.json();
      setRoomMessages(data.payload.messages);
      toast.success(data.message);
    } else {
      const data = await messageRes.json();
      toast.error(data.message);
    }
  };

  useEffect(() => {
    // console.log("selectedRoom rr useE", selectedRoom);
    const a = selectedRoom
      .split(",")
      .filter((email) => email !== currentUser.email);
    if (a.length === 0) {
      setCurrentRoom(users.find((user) => user.email === currentUser.email));
    } else {
      setCurrentRoom(users.find((user) => user.email === a[0]));
    }
  }, [selectedRoom]);

  useEffect(() => {
    setRoomMessages(null);
    socket.emit("join_room", selectedRoom);
    updateRoomMessages(selectedRoom);
    // socket.on("receive_room_messages", (rmMessages) => {
    //   // console.log("got room Messages", rmMessages);
    //   setRoomMessages(rmMessages);
    // });
  }, [selectedRoom]);

  useEffect(() => {
    socket.on("receive_room_messages", (rmMessages) => {
      // console.log("got room Messages", rmMessages);
      setRoomMessages(rmMessages);
    });
  }, [socket]);

  // useEffect(() => {
  //   socket.on("receive_room_messages", (rmMessages) => {
  //     // console.log("got room Messages", rmMessages);
  //     setRoomMessages(rmMessages);
  //   });
  // });

  useEffect(() => {
    scrollToBottom();
  }, [roomMessages]);
  return (
    <div className="conversation-room">
      <div className="conversation-room-header header">
        <div className="left">
          <img
            src={
              currentRoom.image ||
              "https://icon2.cleanpng.com/20180615/hxf/kisspng-avatar-user-profile-male-logo-profile-icon-5b238cafcb8559.4398361515290564318336.jpg"
            }
            alt={`${currentRoom.name}`}
          />
          <div className="name-mobile">
            <span className="header-name" style={{ fontSize: "14px" }}>
              {currentRoom.name} - {currentRoom.email}
            </span>
            <span>
              {currentRoom.isOnline ? (
                <p style={{ color: "yellow" }}>online</p>
              ) : (
                <p style={{ color: "#FBD1A2" }}>
                  {moment(currentRoom.lastSeen).fromNow()}
                </p>
              )}
            </span>
          </div>
        </div>
        <div className="right">
          <IconButton
            sx={{ color: "white" }}
            aria-label="back"
            onClick={() => setSelectedRoom("")}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
      </div>
      <div className="conversation-room-body">
        <div className="messages-container">
          {roomMessages
            ? roomMessages.map((message) => (
                <Message key={message._id} message={message} />
              ))
            : null}
          <div ref={messagesEndRef}></div>
        </div>
      </div>
      <div className="conversation-room-footer p-4">
        {/* <input type="text" /> */}
        <TextField
          fullWidth
          label="Enter Message"
          id="message-input"
          onChange={(e) => setCurrentMessage(e.target.value)}
          value={currentMessage}
          onKeyPress={(e) =>
            e.key === "Enter" ? sendMessage(currentMessage) : null
          }
        />
        <SendIcon color="primary" onClick={sendMessage} />
      </div>
    </div>
  );
}

function Message({ message }) {
  const { currentUser, isMobile } = useContext(appContext);
  return (
    <div
      className="message-wrapper"
      style={
        message.from === currentUser.email
          ? {
              marginLeft: "auto",
              backgroundColor: "#F7D8BA",
              maxWidth: isMobile ? "200px" : "400px",
            }
          : {
              marginRight: "auto",
              backgroundColor: "#ACDDDE",
              maxWidth: isMobile ? "200px" : "400px",
            }
      }
    >
      <p className="message-content">{message.content}</p>
      <div
        className="name-time-wrapper"
        style={isMobile ? { flexWrap: "wrap" } : null}
      >
        <p className="message-from">
          {message.from === currentUser.email ? null : message.from}
        </p>
        <p className="message-time">{moment(message.createAt).format("LLL")}</p>
      </div>
    </div>
  );
}

export { ConversationRoom };
