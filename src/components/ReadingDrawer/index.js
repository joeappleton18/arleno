import React from 'react';
import { useStores } from '../../stores';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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

const AnnotationItem = (props) => {
    const { annotation, onAnnotationClick, onAnnotationHover } = props;
    const classes = useStyles();
    const { uiStore } = useStores();
    return (
        <List className={classes.list}>
            <ListItem button key={annotation.id} onClick={() => onAnnotationClick(annotation.id)} onMouseOver={() => onAnnotationHover(annotation.id)}>
                <ListItemIcon> {annotation.type == "question" ? <HelpIcon /> : <InfoIcon />}</ListItemIcon>
                <ListItemText primary={annotation.question.question} />
            </ListItem>
        </List>
    );
}

const ReadingDrawer = (props) => {

    const { onClose, onAnnotationClick, onAnnotationHover, annotations, ...other } = props;


    const classes = useStyles();
    const theme = useTheme();
    const { uiStore } = useStores();

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
                                <AnnotationItem annotation={annotation} onAnnotationClick={onAnnotationClick} onAnnotationHover={onAnnotationHover} />
                                <Divider />
                            </React.Fragment>))

                    }


                </div>
            </Drawer>
        </React.Fragment>
    );


}

// const ReadingDrawer = (props) => {
//     const classes = useStyles();
//     const [state, setState] = React.useState({
//         top: false,
//         left: false,
//         bottom: false,
//         right: true,
//     });

//     const toggleDrawer = (anchor, open) => (event) => {
//         if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//             return;
//         }

//         setState({...state, [anchor]: open });
//     };

//     const list = (anchor) => (
//         <div
//             className={clsx(classes.list, {
//                 [classes.fullList]: anchor === 'top' || anchor === 'bottom',
//             })}
//             role="presentation"
//             onClick={toggleDrawer(anchor, false)}
//             onKeyDown={toggleDrawer(anchor, false)}
//         >
//             <List>
//                 {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//                     <ListItem button key={text}>
//                         <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//                         <ListItemText primary={text} />
//                     </ListItem>
//                 ))}
//             </List>
//             <Divider />
//             <List>
//                 {['All mail', 'Trash', 'Spam'].map((text, index) => (
//                     <ListItem button key={text}>
//                         <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//                         <ListItemText primary={text} />
//                     </ListItem>
//                 ))}
//             </List>
//         </div>
//     );

//     return (
//         <div>

//             <React.Fragment key={anchor}>
//                 <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
//                     {list(anchor)}
//                 </Drawer>
//             </React.Fragment>


//             {['left', 'right', 'top', 'bottom'].map((anchor) => (
//                 <React.Fragment key={anchor}>
//                     <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
//                     <Drawer anchor={"right"} open={true} onClose={toggleDrawer(anchor, false)}>
//                         {list(anchor)}
//                     </Drawer>
//                 </React.Fragment>
//             ))}
//         </div>
//     );
// }


ReadingDrawer.defaultProps = {
    annotations: []
}

export default ReadingDrawer;