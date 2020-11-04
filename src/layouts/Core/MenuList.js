import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useStores } from "../../stores";
import Link from "next/link";
import textTOHash from "../../utils/textToHash";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },

  heading: {
    fontWeight: "bold",
    fontSize: "20px",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  subListItem: {
    marginLeft: theme.spacing(1),
    fontSize: "15px",
  },
}));

const WeekItem = ({ item }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText
          classes={{ primary: classes.heading }}
          className={classes.heading}
          primary={item.headings.find((h) => h.depth === 1).children[0].value}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {item.headings
          .filter((h) => h.depth === 2)
          .map((h, i) => (
            <List key={i} component="div" disablePadding>
              <Link
                href={
                  (item.pageName.split(".")[0] == "index"
                    ? ""
                    : item.pageName.split(".")[0]) +
                  "/#" +
                  textTOHash(h.children[0].value)
                }
              >
                <ListItem button className={classes.nested}>
                  <>
                    <ListItemText
                      classes={{ primary: classes.subListItem }}
                      className={classes.subListItem}
                      primary={h.children[0].value}
                    />
                  </>
                </ListItem>
              </Link>
            </List>
          ))}
      </Collapse>{" "}
    </>
  );
};

const MenuList = () => {
  const { menuItems } = useStores().menu;
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      dense
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {menuItems.map((i, k) => (
        <WeekItem key={k} item={i} />
      ))}
    </List>
  );
};

export default MenuList;
