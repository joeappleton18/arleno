import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import SettingsIcon from "@material-ui/icons/Settings";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const LoggedInMenu = (props) => {
  const { anchorEl, onClose, onClick } = props;

  return (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem onClick={(e) => onClick("profile")}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Update Profile" />
      </MenuItem>
      <MenuItem onClick={(e) => onClick("logout")}>
        <ListItemIcon>
          <MeetingRoomIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </MenuItem>
    </StyledMenu>
  );
};

export default LoggedInMenu;
