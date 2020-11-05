import { useState, useEffect } from 'react'
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
import UpArrowFilled from '@material-ui/icons/Forward';

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


const AnswerSection = ({ upvotes, onUpvote, onUnvote }) => {

    const classes = useStyles();
    const userStore = useStores().user
    const [arrowActive, setArrowActive] = useState(false);
    const [userVoted, setUserVoted] = useState(false);


    useEffect(() => {
        let userVoted = (upvotes.filter(x => x.uid === userStore.user.uid)).length > 0;
        setArrowActive(userVoted);
        setUserVoted(userVoted);
    }, [upvotes])

    
    return (<Grid container direction="row" justify="flexStart">
        <Grid item xs={9} md={5} style={{ display: 'flex' }}>
            {userVoted && (<span onClick={(e) => onUnvote(e)} >
                <UpArrowFilled className={classes.likeIcon} />
            </span>)}

            {!userVoted && (<span onClick={(e) => onUpvote(e)} onMouseEnter={() => setArrowActive(true)} onMouseLeave={() => setArrowActive(false)}>
                {
                    arrowActive && <UpArrowFilled className={classes.likeIcon} />
                }

                {
                    !arrowActive && <UpArrow className={classes.likeIcon} />
                }

            </span>)}

            <Typography variant="p" style={{ color: "grey", lineHeight: 1, marginTop: "10px" }}> Upvotes {" "} </Typography>
            <Typography style={{ color: "grey", lineHeight: 1, marginTop: "10px" }} variant={'p'}>   ({upvotes.length}) </Typography>
            <AvatarGroup
                style={{ marginLeft: "0.8%", marginBottom: '1%', marginTop: "1.5%" }}
                photos={upvotes}
                onlineBadge={false}
                max={10}
                size={30}
                photos={upvotes}
            />

        </Grid>


        <Divider style={{ marginTop: "2%" }} />
    </Grid >)
}

AnswerSection.defaultProps = {
    upvotes: []
}



const Answer = (props) => {
    const { answer, photo, children, onUpdate, showEdit, onUpvote, onUnvote } = props;
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
            <AnswerSection upvotes={answer.upvotes} onUnvote={(e) => onUnvote(e)} onUpvote={() => onUpvote()} />

        </Grid >
    );
};

Answer.defaultProps = {
    showEdit: false
}

export default Answer;