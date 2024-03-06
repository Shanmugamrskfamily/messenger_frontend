import { useContext, useEffect, useRef, useState } from "react";
import { appContext, socket } from "../App.js";
import moment from "moment";
import { toast } from "react-toastify";

function ConversationRoom() {
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
        method: "GET",
        headers: {
          selectedroom: selectedRoom,
          // Include the current user's email address in the request headers
          currentUserEmail: currentUser.email,
        },
      }
    );
    if (messageRes.status === 200) {
      const data = await messageRes.json();
      setRoomMessages(data.payload.messages);
      toast.success('Messages Loaded Successfully!');
    } else {
      const data = await messageRes.json();
      toast.error('Error on Loading Messages!');
    }
  };

  useEffect(() => {
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
  }, [selectedRoom]);

  useEffect(() => {
    socket.on("receive_room_messages", (rmMessages) => {
      setRoomMessages(rmMessages);
    });
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [roomMessages]);

  return (
    <div className="flex flex-col  border border-gray-200 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img
            src={
              currentRoom.image ||
              "https://icon2.cleanpng.com/20180615/hxf/kisspng-avatar-user-profile-male-logo-profile-icon-5b238cafcb8559.4398361515290564318336.jpg"
            }
            alt={`${currentRoom.name}`}
            className="w-12 h-12 rounded-full mr-2"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-lg">{currentRoom.name}</span>
            <span>
              {currentRoom.isOnline ? (
                <p className="text-yellow-500">online</p>
              ) : (
                <p className="text-yellow-500">
                  {moment(currentRoom.lastSeen).fromNow()}
                </p>
              )}
            </span>
          </div>
        </div>
        <div>
          <button
            className="text-white bg-blue-500 px-4 py-2 rounded"
            onClick={() => setSelectedRoom("")}
          >
            Back
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {roomMessages &&
            roomMessages.map((message) => <Message key={message._id} message={message} />)}
          <div ref={messagesEndRef}></div>
        </div>
      </div>
      <div className="flex items-center mt-4">
        <input
          type="text"
          className="border border-gray-300 py-2 px-4 rounded flex-grow"
          placeholder="Enter Message"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) =>
            e.key === "Enter" ? sendMessage(currentMessage) : null
          }
        />
        <button
          className="text-white bg-blue-500 px-4 py-2 rounded ml-4"
          onClick={() => sendMessage()}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export { ConversationRoom };
