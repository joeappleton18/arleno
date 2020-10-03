import clsx from "clsx";
import { withStyles, createStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { SocialIcon } from "react-social-icons";
import { themeObj } from "../../config/theme";

const styles = {
  root: {
    cursor: "pointer",
    background: "linear-gradient(45deg, #111111 30%, #222222 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    width: 300,
    fontSize: "15px",
    padding: "0 30px",
    boxShadow: `0 1.5px 2.5px 1px ${themeObj.palette.primary.dark}`,
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

const simpleGreyButtonStyles = {
  ...styles,
  ...{
    root: {
      ...styles.root,
      background: `linear-gradient(45deg, ${themeObj.palette.primary.medium} 30%, ${themeObj.palette.primary.medium} 90%)`,
      height: 30,
    },
  },
};

const formButton = {
  ...styles,
  ...{
    root: {
      ...styles.root,
      background: `linear-gradient(45deg, ${themeObj.palette.primary.dark} 30%, ${themeObj.palette.primary.dark} 90%)`,

      height: 50,
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

const SimpleGreyButton = withStyles(simpleGreyButtonStyles)((props) => {
  const { classes, text, ...other } = props;

  return (
    <Button
      {...other}
      classes={{
        root: classes.root,
        label: classes.label,
      }}
      disableFocusRipple
    >
      {text}
    </Button>
  );
});

const FormButton = withStyles(formButton)((props) => {
  const { classes, text, ...other } = props;

  return (
    <Button
      {...other}
      classes={{
        root: classes.root,
        label: classes.label,
      }}
      disableFocusRipple
    >
      {text}
    </Button>
  );
});

export { Git, Facebook, Google, SimpleGreyButton, FormButton };
