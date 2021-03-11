import { useState } from 'react';
import { useStores } from '../../stores';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import List from '@material-ui/core/List';
import IconButton from "@material-ui/core/IconButton";
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import clsx from "clsx";
import InfoIcon from '@material-ui/icons/Info';
import HelpIcon from '@material-ui/icons/Help';


const useStyles = makeStyles((theme) => ({

    chevron: {
        color: '#fff'
    },

    list: {
        width: 400,
        display: 'flex'
    },
    listItem: {
        display: 'flex'
    },
    fullList: {
        width: 'auto',
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        paddingLeft: "4%",
        color: "#fff",
        backgroundColor: theme.palette.primary.dark,
        ...theme.mixins.toolbar,
    }
}));

const EditDeleteAnnotation = (props) => {

    const { onEdit, onDelete } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const options = [
        'Edit',
        'Delete'
    ];

    const handleEditDelete = (item, event) => {
        event.preventDefault();
        event.stopPropagation();
        setAnchorEl(null);
        if (item.toLowerCase() === 'edit') {
            onEdit();
            return;
        }
        onDelete();
    }

    const handleUpdateClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleUpdateClose = (event) => {
        setAnchorEl(null);
    }


    const ITEM_HEIGHT = 48;


    return (
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
                    <MenuItem key={option} onClick={(event) => handleEditDelete(option, event)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>

        </>
    );
}

const AnnotationItem = (props) => {
    const { annotation, onAnnotationClick, onAnnotationHover, onDelete, onEdit } = props;
    const classes = useStyles();
    const { user } = useStores();

    const handleDelete = () => onDelete(annotation.id);
    const handleEdit = () => onEdit(annotation.id);

    return (
        <List className={classes.list}>
            <ListItem button key={annotation.id} onClick={() => onAnnotationClick(annotation.id)} onMouseOver={() => onAnnotationHover(annotation.id)}>
                <ListItemIcon> {annotation.type == "question" ? <HelpIcon /> : <InfoIcon />}</ListItemIcon>
                <ListItemText primary={annotation.question.question} />
                {user.user.type == "A" && <EditDeleteAnnotation onDelete={handleDelete} onEdit={handleEdit} />}
            </ListItem>
        </List>
    );
}

const ReadingDrawer = (props) => {

    const { onClose, onAnnotationDelete, onAnnotationEdit, onAnnotationClick, onAnnotationHover, annotations, ...other } = props;


    const classes = useStyles();
    const theme = useTheme();
    const { uiStore, user } = useStores();

    return (
        <React.Fragment {...other}>
            <Drawer variant="persistent" className={classes.drawer} anchor={'right'} open={uiStore.readingDrawOpen} >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={onClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronRightIcon onClick={() => uiStore.setReadingDrawOpen(false)} className={classes.chevron} />
                        ) : (
                                <ChevronLeftIcon className={classes.chevron} />
                            )}
                    </IconButton>
                    <Typography align="center" variant="h6">
                        Annotations
                    </Typography>

                </div>

                <div>
                    {

                        annotations.map(annotation => (

                            <React.Fragment>
                                <AnnotationItem onDelete={onAnnotationDelete}
                                    onEdit={onAnnotationEdit}
                                    onDelete={onAnnotationDelete}
                                    annotation={annotation}
                                    onAnnotationClick={onAnnotationClick}
                                    onAnnotationHover={onAnnotationHover} />
                                <Divider />
                            </React.Fragment>))

                    }


                </div>
            </Drawer>
        </React.Fragment>
    );


}



ReadingDrawer.defaultProps = {
    annotations: []
}

export default ReadingDrawer;