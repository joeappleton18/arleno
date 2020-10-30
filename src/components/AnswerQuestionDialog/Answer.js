import { useStores } from "../../stores/";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import AvatarGroup from "../AvatarGroup/";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    likeIcon: {
        color: theme.palette.primary.main,
        cursor: "pointer",
    },
    photoSection: {
        display: "flex",
    }
}))

const Answer = (props) => {
    const { photo, children } = props;
    const classes = useStyles();
    const userStore = useStores().user;

    const tmpUserArray = [
        {
            photoURL: "wsh3t9dsa1wo5ummmm7h",
            lastName: "Appleton",
            firstName: "Joe",
        },
        {
            photoURL: "wsh3t9dsa1wo5ummmm7h",
            lastName: "Appleton",
            firstName: "Joe",
        },
        {
            photoURL: "wsh3t9dsa1wo5ummmm7h",
            lastName: "Appleton",
            firstName: "Joe",
        },
        {
            photoURL: "wsh3t9dsa1wo5ummmm7h",
            lastName: "Appleton",
            firstName: "Joe",
        },
    ];

    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                {photo}
            </Grid>
            <Grid item xs={12}>
                {children}
            </Grid>
            <Grid item xs={12} className={classes.photoSection}>
                <ThumbUpAltOutlinedIcon className={classes.likeIcon} />
                <AvatarGroup
                    style={{ marginLeft: "0.2%", marginTop: "0.2%" }}
                    photos={tmpUserArray}
                    onlineBadge={false}
                    size={30}
                />

                <Divider style={{ marginTop: "2%" }} />
            </Grid>

        </Grid>
    );
};

export default Answer;