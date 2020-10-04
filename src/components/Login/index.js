import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Git, Facebook, Google } from "../Buttons";
import Typography from "@material-ui/core/Typography";
import { useFirebase } from "../../services/firebase";
import { useStores } from "../../stores/index";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
    cursor: "pointer",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const Login = (props) => {
  const { onClose } = props;
  const classes = useStyles();
  const fbService = useFirebase();
  const userStore = useStores().user;

  const handleClick = async (network) => {
    try {
      const user = await fbService.auth.signInWithProvider(network);
      const userRef = await fbService.user.read(user.user.uid);
      userStore.setUser(userRef.data());
      onClose();
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
        Login/Join With
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
