import React, { memo } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CodeBlock from "./CodeBlock";

const ClickListener = ({ children, ...props }) => (
  <div onClick={() => console.log(props)}> {children} </div>
);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
  p: {
    marginTop: theme.spacing(2),
  },

  heading: {
    marginTop: theme.spacing(2),
  },
}));

const RemarkComponents = {
  table: (() => {
    const Table = (props) => <MuiTable {...props} />;
    return memo(Table);
  })(),
  table: (() => {
    const Table = (props) => <MuiTable {...props} />;
    return memo(Table);
  })(),
  tr: (() => {
    const Tr = (props) => <StyledTableRow {...props} />;
    return memo(Tr);
  })(),
  td: (() => {
    const Td = ({ align, ...props }) => (
      <TableCell align={align || undefined} {...props} />
    );
    return memo(Td);
  })(),
  tbody: (() => {
    const TBody = (props) => <TableBody {...props} />;
    return memo(TBody);
  })(),
  th: (() => {
    const Th = ({ align, ...props }) => (
      <StyledTableCell align={align || undefined} {...props} />
    );
    return memo(Th);
  })(),
  thead: (() => {
    const THead = (props) => <TableHead {...props} />;
    return memo(THead);
  })(),

  code: (() => {
    const Code = (props) => <CodeBlock {...props} />;
    return memo(Code);
  })(),
  blockquote: (() => {
    const Blockquote = (props) => {
      debugger;
      return (
        <p
          style={{
            borderLeft: "4px solid grey",
            padding: 8,
            color: "grey",
            lineHeight: 1,
          }}
        >
          {props.children.props.children.props.children}
        </p>
      );
    };

    return memo(Blockquote);
  })(),
};

export default RemarkComponents;
