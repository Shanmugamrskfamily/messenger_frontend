import { TextField } from "@mui/material";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { appContext } from "../App";
import { useNavigate } from "react-router-dom";

function ChatRoomsList() {
  const { users, setUsers, selectedRoom, setSelectedRoom, socket } =
    useContext(appContext);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const handleSearch = (e) => {
    setFilteredUsers(
      users?.filter((user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  const navigate=useNavigate();
  
  useEffect(()=>{
    const token=localStorage.getItem('logintoken');
    if(!token){
      navigate('/');
    }
  },[navigate])

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  return (
    <div className="chat-room-body">
      <div className="input-wrapper">
        <TextField
          name="userSearch"
          label="Search By Name"
          type="search"
          variant="filled"
          onChange={handleSearch}
          className="chat-room-filter-input"
        />
      </div>
      <div className="chat-rooms-list">
        {filteredUsers?.length > 0 ? (
          filteredUsers.map((user) => <Room key={user._id} user={user} />)
        ) : (
          <p>No Users</p>
        )}
      </div>
    </div>
  );
}

function Room({ user }) {
  const { currentUser, selectedRoom, setSelectedRoom } = useContext(appContext);
  return (
    <div
      className={
        selectedRoom?.includes(currentUser.email)
          ? "room-wrapper selected-room"
          : "room-wrapper"
      }
      onClick={() => {
        const result =
          currentUser.email < user.email
            ? currentUser.email + "," + user.email
            : user.email + "," + currentUser.email;
        setSelectedRoom(result);
        // console.log("1 selected room res", selectedRoom, result);
      }}
    >
      <div className="left">
        <div className="image-wrapper">
          <img
            src={
              user.image ||
              "https://icon2.cleanpng.com/20180615/hxf/kisspng-avatar-user-profile-male-logo-profile-icon-5b238cafcb8559.4398361515290564318336.jpg"
            }
            alt={`${user.name}`}
          />
          <CircleIcon
            sx={
              user.isOnline
                ? { color: "green", fontSize: "10px" }
                : { color: "red", fontSize: "10px" }
            }
          />
        </div>
        <div className="name-mobile">
          <span>
            {user.email === currentUser.email
              ? user.name + "  (self)"
              : user.name}
          </span>
          <span>{user.mobile}</span>
        </div>
      </div>
      <div className="right">
        <p>{moment(user.lastSeen).fromNow()}</p>
      </div>
    </div>
  );
}

export { ChatRoomsList };
