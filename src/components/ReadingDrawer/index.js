import { useState } from "react";
import { useStores } from "../../stores";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import clsx from "clsx";
import InfoIcon from "@material-ui/icons/Info";
import HelpIcon from "@material-ui/icons/Help";
import UpdateDeleteToggle from "../UpdateDeleteToggle";

const useStyles = makeStyles((theme) => ({
  chevron: {
    color: "#fff",
  },

  list: {
    width: 400,
    display: "flex",
  },
  listItem: {
    display: "flex",
  },
  fullList: {
    width: "auto",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    paddingLeft: "4%",
    color: "#fff",
    backgroundColor: theme.palette.primary.dark,
    ...theme.mixins.toolbar,
  },
}));

const AnnotationItem = (props) => {
  const {
    annotation,
    onAnnotationClick,
    onAnnotationHover,
    onDelete,
    onEdit,
  } = props;
  const classes = useStyles();
  const { user } = useStores();

  const handleDelete = () => onDelete(annotation.id);
  const handleEdit = () => onEdit(annotation.id);

  return (
    <List className={classes.list}>
      <ListItem
        button
        key={annotation.id}
        onClick={() => onAnnotationClick(annotation.id)}
        onMouseOver={() => onAnnotationHover(annotation.id)}
      >
        <ListItemIcon>
          {" "}
          {annotation.type == "question" ? <HelpIcon /> : <InfoIcon />}
        </ListItemIcon>
        {<ListItemText primary={annotation.question.question} />}
        {user.user.type == "A" && (
          <UpdateDeleteToggle onDelete={handleDelete} onEdit={handleEdit} />
        )}
      </ListItem>
    </List>
  );
};

const ReadingDrawer = (props) => {
  const {
    onClose,
    onAnnotationDelete,
    onAnnotationEdit,
    onAnnotationClick,
    onAnnotationHover,
    annotations,
    ...other
  } = props;

  debugger;
  const classes = useStyles();
const theme = useTheme();
  const { uiStore, user } = useStores();

  return (
    <React.Fragment {...other}>
      <Drawer
        variant="persistent"
        className={classes.drawer}
        anchor={"right"}
        open={uiStore.readingDrawOpen}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={onClose}>
            {theme.direction === "ltr" ? (
              <ChevronRightIcon
                onClick={() => uiStore.setReadingDrawOpen(false)}
                className={classes.chevron}
              />
            ) : (
              <ChevronLeftIcon className={classes.chevron} />
            )}
          </IconButton>
          <Typography align="center" variant="h6">
            Annotations
          </Typography>
        </div>

        <div>
          {annotations.map((annotation) => (
            <React.Fragment>
              <AnnotationItem
                onDelete={onAnnotationDelete}
                onEdit={onAnnotationEdit}
                onDelete={onAnnotationDelete}
                annotation={annotation}
                onAnnotationClick={onAnnotationClick}
                onAnnotationHover={onAnnotationHover}
              />
              <Divider />
            </React.Fragment>
          ))}
        </div>
      </Drawer>
    </React.Fragment>
  );
};

ReadingDrawer.defaultProps = {
  annotations: [],
};

export default ReadingDrawer;
