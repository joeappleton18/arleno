import Avatar from "@material-ui/core/Avatar";
import MaterialAvatarGroup from "@material-ui/lab/AvatarGroup";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Image, Transformation } from "cloudinary-react";
import cloudinaryConfig from "../../config/cloudinary";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import { useStores } from "../../stores";

const cloudinaryUrl = `http://res.cloudinary.com/${cloudinaryConfig.cloudName}/image`;
const transformation = "c_thumb,g_face,h_80,r_max,w_80";
const constructUrl = (image, type) =>
  `${cloudinaryUrl}/${type}/${transformation}/${image}`;

const getUrl = (image) => {
  if (!image) {
    return;
  }

  return image.match(/^https*/)
    ? constructUrl(image, "fetch")
    : constructUrl(image, "upload");
};

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}))(Badge);

const OnlineAvatar = ({ src }) => (
  <StyledBadge
    overlap="circle"
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    variant="dot"
  >
    <Avatar alt="Remy Sharp" style={{ border: "2px solid white" }} src={src} />
  </StyledBadge>
);

const AvatarGroup = (props) => {
  const userStore = useStores().user;

  console.log(userStore.onlineUsers);

  return (
    <MaterialAvatarGroup max={15}>
      {userStore.onlineUsers.map((u) => (
        <OnlineAvatar
          alt={`${u.firstName} '' ' ', ${u.lastName} `}
          src={getUrl(u.photoURL || 0)}
        />
      ))}
    </MaterialAvatarGroup>
  );
};

export default AvatarGroup;
