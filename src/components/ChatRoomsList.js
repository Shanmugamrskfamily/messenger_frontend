import { useContext } from "react";
import { appContext } from "../App.js";

function ChatRoomsList() {
  const { users, setSelectedRoom } = useContext(appContext);

  return (
    <div className="flex flex-col ">
      <h2 className="text-2xl font-semibold mb-4">Chat Rooms</h2>
      <div className="space-y-2">
        {users.map((user) => (
          <Room key={user.email} user={user} setSelectedRoom={setSelectedRoom} />
        ))}
      </div>
    </div>
  );
}

function Room({ user, setSelectedRoom }) {
  return (
    <div
      className="flex  p-4 cursor-pointer border rounded-lg hover:border-blue-500"
      onClick={() => setSelectedRoom(user.email)}
    >
      <div className="flex items-center space-x-4">
        <img
          src={user.image || "https://i.imgur.com/rWYtZ3p.jpg"}
          alt={user.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h2 className="font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
      <div>
        {user.isOnline ? (
          <span className="bg-green-500 w-4 h-4 rounded-full inline-block"></span>
        ) : (
          <span className="bg-gray-300 w-4 h-4 rounded-full inline-block"></span>
        )}
      </div>
    </div>
  );
}

export { ChatRoomsList };
