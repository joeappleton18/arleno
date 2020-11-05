
import { useStores } from "../../stores";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Image, Transformation } from "cloudinary-react";
import Avatar from "@material-ui/core/Avatar";
import { getUrl, OnlineAvatar } from "../AvatarGroup";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  caption: {
    fontSize: "0.8rem",
    marginLeft: "1%",
    color: "grey",
  },
  pictureBox: {
    display: "flex",
    "& p": {
      fontSize: "1.1rem",
      lineHeight: "2px",
      marginLeft: "1%",
      marginTop: "11%",
      [theme.breakpoints.up('sm')]: {
        marginTop: "7%",
      },
      [theme.breakpoints.up('md')]: {
        marginTop: "5%",
      },
      [theme.breakpoints.up('lg')]: {
        marginTop: "3%",
      },

      fontWeight: "500",
    },
  },
}));

const ProfilePicture = (props) => {
  const { size, photoURL, center, name, date } = props;
  const classes = useStyles();
  const userStore = useStores().user;
  dayjs.extend(relativeTime);


  const transform = (
    <Transformation
      width={size}
      height={size}
      gravity="face"
      crop="thumb"
      radius="max"
    />
  );

  const checkUrl = (url) => (url.match(/^https*/) ? { type: "fetch" } : {});

  const photoStyles = center
    ? { display: "block", margin: "0 auto", width: size, height: size }
    : { width: size, height: size };

  const renderImage = () => {
    if (!photoURL) {
      return <Avatar style={photoStyles} />;
    }

    return (
      <Image
        style={photoStyles}
        publicId={photoURL}
        {...checkUrl(photoURL)}
      >
        <Transformation
          width={size}
          height={size}
          gravity="face"
          crop="thumb"
          radius="max"
        />
      </Image>
    );
  };

  return (
    <>
      {!name && renderImage()}
      {name && (
        <Grid container justify="flex-start">
          <Grid item xs={12} className={classes.pictureBox}>
            <OnlineAvatar
              size={50}
              src={getUrl(photoURL || 0, 50)}
              online={false}
            />
            <Grid item xs={6}>
              <Typography> {name.first} {name.last}</Typography>
              <Typography variant="caption" className={classes.caption}>
                {dayjs().to(dayjs(date))}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

ProfilePicture.defaultProps = {
  size: 80,
  photoUrl: null,
  center: true,
  name: false,
};

export default ProfilePicture;
