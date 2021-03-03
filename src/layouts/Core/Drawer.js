import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import MenuList from "./MenuList";
import notesConfig from "../../config/notes";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: theme.drawer.width,
    flexShrink: 0,
  },
  drawerPaper: {
    width: theme.drawer.width,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    paddingLeft: "4%",
    color: "#fff",
    backgroundColor: theme.palette.primary.dark,
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  },
}));

const ReadingDrawer = (props) => {
  const { drawerOpen, onDrawerClose } = props;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={drawerOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Typography variant="h6" style={{ textAlign: "center" }}>
          {notesConfig.course}
        </Typography>
        <IconButton onClick={onDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
              <ChevronRightIcon />
            )}
        </IconButton>
      </div>
      <Divider />
      <MenuList />
      <Divider />
    </Drawer>
  );
};

export default ReadingDrawer;
