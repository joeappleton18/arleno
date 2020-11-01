import { useState } from 'react'
import { useStores } from "../../stores/";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import AvatarGroup from "../AvatarGroup/";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    likeIcon: {
        color: theme.palette.primary.main,
        cursor: "pointer",
    },
    photoSection: {
        display: "flex",

    },
    profilePhotoSection: {
        display: "flex",

    }
}))

const Answer = (props) => {
    const { photo, children, onUpdate, showEdit } = props;
    const classes = useStyles();
    const userStore = useStores().user;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const options = [
        'Edit',
        'Delete'
    ];

    const ITEM_HEIGHT = 48;

    const handleUpdateClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleUpdateClose = (event) => {
        setAnchorEl(null);
    }
    const handleEditDelete = (item) => {
        setAnchorEl(null);
        onUpdate(item.toLowerCase());
    }


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

            <Grid item xs={12} className={classes.photoSection}>
                {photo}
                {showEdit &&
                    <>
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleUpdateClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleUpdateClose}
                            PaperProps={{
                                style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: '20ch',
                                },
                            }}
                        >
                            {options.map((option) => (
                                <MenuItem key={option} onClick={() => handleEditDelete(option)}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Menu>

                    </>
                }

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

Answer.defaultProps = {
    showEdit: false
}

export default Answer;