import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import Snackbar from "@material-ui/core/Snackbar";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import MuiAlert from "@material-ui/lab/Alert";
import { MDXProvider } from "@mdx-js/react";
import clsx from "clsx";
import Router from 'next/router';
import { useEffect, useState } from "react";
import AvatarGroup from "../../components/AvatarGroup";
import Login from "../../components/Login";
import ProfileFrom from "../../components/ProfileForm";
import RemarkComponents from "../../components/Remark";
import notesConfig from "../../config/notes";
import { useFirebase } from "../../services/firebase";
import { useStores } from "../../stores/";
import Drawer from "./Drawer";
import LoggedInMenu from "./LoggedInMenu";


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    color: "#fff",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.easeOut,
    }),
  },
  container: {
    paddingTop: theme.spacing(7),
  },
  contentShift: {
    marginLeft: theme.drawerWidth,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: theme.drawer.width,
  },

  contentShiftLeft: {

    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),

    paddingRight: theme.drawer.width + 50,
  },


  profileName: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    fontWeight: "bold",
  },
  toolBar: {
    color: "#fff",
    background: `linear-gradient(90deg, ${theme.palette.light} 0%, ${theme.palette.dark} 124.87%)`,
  },
  appBarShift: {
    width: `calc(100% - ${theme.drawer.width}px)`,
    marginLeft: theme.drawer.width,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: "2%",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Core = ({ children }) => {

  const theme = useTheme();

  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const desktop = useMediaQuery(theme.breakpoints.up("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileFormOpen, setProfileFormOpen] = useState(false);
  const [firstProfileFormComplete, setFirstProfileFormComplete] = useState(
    false
  );
  const [loggedInAnchorEl, setLoggedInAnchorEl] = useState(null);
  const userStore = useStores().user;
  const uiStore = useStores().uiStore;
  const authService = useFirebase().auth;

  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  Router.events.on('routeChangeComplete', () => setDrawerOpen(false));

  useEffect(() => {
    if (
      userStore.user &&
      userStore.user.joinStage === 1 &&
      userStore.user.email
    ) {
      setFirstProfileFormComplete(true);
      setTimeout(setProfileFormOpen(true), 0);
    }

    if (desktop) {
      setDrawerOpen(true);
    }
  }, [userStore.user]);

  useEffect(() => {
    //setDrawerOpen(desktop);

  }, [desktop]);

  useEffect(() => {
    notesConfig.sidebar.forEach(async (i) => {
      const file = await import("../../pages/" + i + ".mdx");
      const comp = (
        <MDXProvider components={RemarkComponents}>{children}</MDXProvider>
      );
    });
  }, []);

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-mobile-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleProfileMenuClose}
    >
      <Login
        onClose={() => {
          setAnchorEl(null);
        }}
      />
    </Menu>
  );

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    uiStore.setAlertOpen(false);
  };

  const handleLoggedInMenuClick = async (t) => {
    setLoggedInAnchorEl(null);
    if (t === "logout") {
      try {
        await authService.signOut();
        userStore.setUser({});
        debugger;
        uiStore.deployAlert("Signed Out", "success");
        return;
      } catch (e) {
        console.log("logged out");
      }
    }
    setProfileFormOpen(true);
  };

  const Alert = (props) => (
    <MuiAlert elevation={6} variant="filled" {...props} />
  );

  const SnackBar = () => (
    <Snackbar
      open={uiStore.alertOpen}
      autoHideDuration={2000}
      onClose={handleAlertClose}
    >
      <Alert onClose={handleAlertClose} severity={uiStore.alertType}>
        {uiStore.alert}
      </Alert>
    </Snackbar>
  );

  if (uiStore.hideMenu) {
    return <Container> {children}</Container>
  }

  return (
    <div className={classes.grow}>
      {" "}
      <AppBar
        position="fixed"
        className={classes.appBar}
        elevation={0}
        className={clsx({
          [classes.appBarShift]: drawerOpen,
          [classes.contentShiftLeft]: uiStore.readingDrawOpen
        })}
      >
        <Toolbar className={classes.toolBar}>
          {!drawerOpen && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              onClick={handleDrawerOpen}
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
          )}
          {!drawerOpen && (
            <Typography className={classes.title} variant="h6" noWrap>
              {notesConfig.course}

            </Typography>
          )}

          {<AvatarGroup photos={userStore.onlineUsers} />}

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {userStore.user && userStore.user.email && (
              <>
                {/*<IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>*/}
                {/* <ProfilePhoto size={40} />{" "} */}
                <Typography className={classes.profileName}>
                  {" "}
                  {userStore.user.firstName}
                </Typography>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <ArrowDropDownCircleIcon
                    onClick={(e) => setLoggedInAnchorEl(e.currentTarget)}
                  />
                </IconButton>
              </>
            )}

            {!userStore.user ||
              (!userStore.user.email && (
                <Button color="inherit" onClick={handleProfileMenuOpen}>
                  Login/Join
                </Button>
              ))}

            <LoggedInMenu
              anchorEl={loggedInAnchorEl}
              onClose={() => setLoggedInAnchorEl(null)}
              onClick={handleLoggedInMenuClick}
            />
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
            {renderMenu}
            <ProfileFrom
              open={profileFormOpen}
              onSubmit={() => {
                setProfileFormOpen(false);
                setFirstProfileFormComplete(false);
              }}
              firstUpdate={firstProfileFormComplete}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer drawerOpen={drawerOpen} onDrawerClose={handleDrawerClose} />


      {/** we can adjust based on the draw being open (drawerOpen ? "md" : "md"). However, for now,
       * I am only differentiating between reading and non reading mode
       */}

      <Container
        className={clsx({
          [classes.contentShift]: drawerOpen,
          [classes.container]: true,
        })}
        maxWidth={!uiStore.readingMode ? "md" : "xl"}
        id="content"
      >
        <MDXProvider components={RemarkComponents}>  {children}</MDXProvider>
        <SnackBar />
      </Container>
    </div>
  );
};

export default Core;
