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
import UpArrow from '@material-ui/icons/ForwardOutlined';
import Typography from "@material-ui/core/Typography";
import UpArrowFilled from '@material-ui/icons/ForwardOutlined';

import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    likeIcon: {
        color: theme.palette.primary.main,
        cursor: "pointer",
        transform: 'rotate(270deg)',
        marginBottom: theme.spacing(3)
    },
    photoSection: {
        display: "flex",

    },
    profilePhotoSection: {
        display: "flex",

    },

}))


const AnswerSection = ({ upvotes }) => {

    const classes = useStyles();

    return (<Grid container direction="row" justify="flexStart">
        <Grid item xs={9} md={5} style={{ display: 'flex' }}>
            <UpArrow className={classes.likeIcon} />
            <AvatarGroup
                style={{ marginLeft: "0.2%", marginBottom: '1%', marginTop: "0.2%" }}
                photos={upvotes}
                onlineBadge={false}
                size={30}
            />
            <Typography style={{ color: "grey", lineHeight: 1, marginTop: "2px" }} variant={'h1'}> 0 </Typography>
        </Grid>


        <Divider style={{ marginTop: "2%" }} />
    </Grid >)
}

AnswerSection.defaultProps = {
    upvotes: []
}



const Answer = (props) => {
    const { photo, children, onUpdate, showEdit } = props;
    const classes = useStyles();
    const userStore = useStores().user;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const tmpUserArray = [
        {
            uid: "123",
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
            <AnswerSection />

        </Grid >
    );
};

Answer.defaultProps = {
    showEdit: false
}

export default Answer;