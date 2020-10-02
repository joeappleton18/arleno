import { useState } from "react";

const userStore = () => {
  const [user, setUser] = useState();
  return {
    user,
    setUser,
  };
};

export default userStore;
