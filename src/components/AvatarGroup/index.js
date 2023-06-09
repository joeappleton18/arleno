import Avatar from "@material-ui/core/Avatar";
import MaterialAvatarGroup from "@material-ui/lab/AvatarGroup";
import cloudinaryConfig from "../../config/cloudinary";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import { useStores } from "../../stores";

const cloudinaryUrl = `http://res.cloudinary.com/${cloudinaryConfig.cloudName}/image`;
const transformation = (size) => `c_thumb,g_face,h_${size},r_max,w_${size}`;
const constructUrl = (image, type, size) =>
  `${cloudinaryUrl}/${type}/${transformation(size)}/${image}`;

export const getUrl = (image, size) => {
  if (!image) {
    return;
  }

  return image.match(/^https*/)
    ? constructUrl(image, "fetch", size)
    : constructUrl(image, "upload", size);
};


const useStyles = makeStyles(() => ({
  avatar: { width: (props) => props.size + "px", height: (props) => props.size + "px", fontSize: "10px" }
}))


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

export const OnlineAvatar = ({ src, alt, online, size }) =>
  online ? (
    <StyledBadge
      overlap="circle"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      variant="dot"
    >
      <Avatar
        alt={alt}
        style={{
          border: "2px solid white",
          width: size + "px",
          height: size + "px",
        }}
        src={src}
      />
    </StyledBadge>
  ) : (
      <Avatar
        alt={alt}
        style={{
          border: "2px solid white",
          width: size + "px",
          height: size + "px",
        }}
        src={src}
      />
    );

const AvatarGroup = (props) => {
  const { photos, onlineBadge, size, ...other } = props;
  const userStore = useStores().user;
  const classes = useStyles(props);
  console.log(userStore.onlineUsers);

  return (
    <MaterialAvatarGroup max={15} classes={{
      avatar: classes.avatar
    }} {...other}>
      {photos.map((u, i) => (
        <OnlineAvatar
          key={i}
          size={size}
          alt={`${u.firstName} '' ' ', ${u.lastName} `}
          src={getUrl(u.photoURL || 0, size)}
          online={onlineBadge}
        />
      ))}
    </MaterialAvatarGroup>
  );
};

AvatarGroup.defaultProps = {
  photos: [],
  onlineBadge: true,
  size: 50,
  max: 15
};

export default AvatarGroup;
