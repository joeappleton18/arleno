import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HelpIcon from "@material-ui/icons/Help";
import InfoIcon from "@material-ui/icons/Info";
import { useStores } from "../../stores";
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

  const classes = useStyles();
  const theme = useTheme();
  const { uiStore, user } = useStores();

  return (
    <React.Fragment {...other}>
      <Drawer
        variant="persistent"
        className={classes.drawer}
        anchor={"right"}
        open={uiStore.readingDrawerOpen}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={onClose}>
            {theme.direction === "ltr" ? (
              <ChevronRightIcon
                onClick={() => uiStore.setReadingDrawerOpen(false)}
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
