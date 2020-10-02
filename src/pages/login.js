import { useFirebase } from "./../services/firebase";
import Login from "../components/Login";

const LogIn = () => {
  const fb = useFirebase();

  const handleClick = async (provider) => {
    try {
      const user = await fb.auth.signInWithProvider(provider);
      console.log(user);
    } catch (e) {
      console.log("login error" + e);
    }
  };

  const handleLogoutClick = async () => {
    fb.auth.signOut();
  };

  return (
    <>
      {" "}
      <>
        {" "}
        <button onClick={handleClick}> Login </button>{" "}
        <button onClick={handleLogoutClick}> Logout </button>
        <Login />
      </>{" "}
    </>
  );
};

export default LogIn;
