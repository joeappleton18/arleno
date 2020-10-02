import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Git, Facebook, Google } from "../Buttons";
import Typography from "@material-ui/core/Typography";
import { useFirebase } from "../../services/firebase";

const useStyles = makeStyles((theme) => ({
  button: {
    background: "black",
    color: "white",
  },
  button: {
    marginTop: theme.spacing(2),
    cursor: "pointer",
  },
}));

const Login = (props) => {
  const { onClick } = props;
  const classes = useStyles();
  const fb = useFirebase();

  const handleClick = async (network) => {
    try {
      const user = await fb.auth.signInWithProvider(network);
      console.log("user has singed in", user);
    } catch (e) {
      console.error("could not log user in:", e);
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h6" color="primary">
        {" "}
        Login/Join With{" "}
      </Typography>
      <Divider variant="middle" />
      <Git className={classes.button} onClick={() => handleClick("git")} />
      <Facebook
        className={classes.button}
        onClick={() => handleClick("facebook")}
      />
      <Google
        className={classes.button}
        onClick={() => handleClick("google")}
      />
    </Grid>
  );
};

export default Login;
