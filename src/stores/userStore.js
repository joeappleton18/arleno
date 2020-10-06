import { useState } from "react";

const userStore = () => {
  const [user, setUser] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  return {
    user,
    setUser,
    onlineUsers,
    setOnlineUsers,
  };
};

export default userStore;
