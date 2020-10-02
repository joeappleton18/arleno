import clsx from "clsx";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { SocialIcon } from "react-social-icons";



const styles = {
  root: {
    background: "linear-gradient(45deg, #111111 30%, #222222 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    width: 300,
    fontSize: "15px",
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
  },
};

const facebookStyles = {
  ...styles,
  ...{
    root: {
      ...styles.root,
      background: "linear-gradient(45deg, #385898 30%, #385898 90%)",
    },
  },
};

const googleStyles = {
  ...styles,
  ...{
    root: {
      ...styles.root,
      background: "linear-gradient(45deg, #e55428 30%, #e55428 90%)",
    },
  },
};

const Git = withStyles(styles)((props) => {
  const { classes, ...other } = props;
  return (
    <Button
      {...other}
      classes={{
        root: clsx(classes.root, { [classes.facebook]: true }), // class name, e.g. `classes-nesting-root-x`
        label: classes.label, // class name, e.g. `classes-nesting-label-x`
      }}
      disableFocusRipple
      startIcon={
        <SocialIcon
          className={classes.button}
          network="github"
          color="#FFFFFF"
          bgColor="#FFFFFF"
          height="40"
          style={{ height: 40, width: 40 }}
        />
      }
    >
      GitHub
    </Button>
  );
});

const Facebook = withStyles(facebookStyles)((props) => {
  const { classes, ...other } = props;

  return (
    <Button
      {...other}
      classes={{
        root: classes.root,
        label: classes.label,
      }}
      disableFocusRipple
      startIcon={
        <SocialIcon
          className={classes.button}
          network="facebook"
          color="#FFFFFF"
          bgColor="#FFFFFF"
          height="40"
          style={{ height: 40, width: 40 }}
        />
      }
    >
      Facebook
    </Button>
  );
});

const Google = withStyles(googleStyles)((props) => {
  const { classes, ...other } = props;

  return (
    <Button
      {...other}
      classes={{
        root: classes.root,
        label: classes.label,
      }}
      disableFocusRipple
      startIcon={
        <SocialIcon
          className={classes.button}
          network="google"
          color="#FFFFFF"
          bgColor="#FFFFFF"
          height="40"
          style={{ height: 40, width: 40 }}
        />
      }
    >
      Google
    </Button>
  );
});

export { Git, Facebook, Google };
