import { useState, useRef, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, fade, useTheme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { MDXProvider } from "@mdx-js/react";
import Draw from "./Draw";
import notesConfig from "../../config/notes";
import RemarkComponents from "../../components/Remark";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useStores } from "../../stores/";
import Menu from "@material-ui/core/Menu";
import Login from "../../components/Login";
import ProfileFrom from "../../components/ProfileForm";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
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
  contentShift: {
    marginLeft: theme.drawerWidth,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: theme.drawer.width,
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
    marginRight: "10%",
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
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Core = ({ children }) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileFormOpen, setProfileFormOpen] = useState(false);
  const [firstProfileFormComplete, setFirstProfileFormComplete] = useState(
    false
  );
  const [loggedInAnchorEl, setLoggedInAnchorEl] = useState(null);
  const userStore = useStores().user;
  const uiStore = useStores().uiStore;

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

  useEffect(() => {
    if (userStore.user && userStore.user.joinStage === 1) {
      setProfileFormOpen(true);
      setFirstProfileFormComplete(true);
    }
  }, [userStore.user]);

  useEffect(() => {
    setDrawerOpen(desktop);
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
      <Login />
    </Menu>
  );

  const renderSearch = (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    uiStore.setAlertOpen(false);
    uiStore.setAlert("");
  };

  const handleLoggedInMenuClick = (t) => {
    setLoggedInAnchorEl(null);
    if (t === "logout") {
      //
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

  return (
    <div className={classes.grow}>
      {" "}
      <AppBar
        className={classes.appBar}
        elevation={0}
        position="static"
        className={clsx({
          [classes.appBarShift]: drawerOpen,
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

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {userStore.user && (
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            )}

            {!userStore.user && (
              <Button color="inherit" onClick={handleProfileMenuOpen}>
                Login/Join
              </Button>
            )}
            {userStore.user && (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircleIcon
                  onClick={(e) => setLoggedInAnchorEl(e.currentTarget)}
                />
              </IconButton>
            )}
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
      <Draw drawerOpen={drawerOpen} onDrawerClose={handleDrawerClose} />
      <Container
        className={clsx({
          [classes.contentShift]: drawerOpen,
        })}
        maxWidth={drawerOpen ? "md" : "lg"}
        id="content"
      >
        <MDXProvider components={RemarkComponents}>{children}</MDXProvider>
        <SnackBar />
      </Container>
    </div>
  );
};

export default Core;
