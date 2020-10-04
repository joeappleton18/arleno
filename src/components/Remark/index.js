import React, { memo } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import textToHash from "./../../utils/textToHash";
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
  li: (() => {
    const li = (props) => (
      <li>
        <Typography style={{ marginTop: "0.8%" }} variant="body1" {...props} />
      </li>
    );
    return memo(li);
  })(),

  p: (() => {
    const P = (props) => (
      <Typography style={{ marginTop: "0.8%" }} variant="body1" {...props} />
    );
    return memo(P);
  })(),
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

  h2: (() => {
    const H2 = (props) => (
      <h2 name={textToHash(props.children)}> {props.children} </h2>
    );

    return H2;
  })(),
  code: (() => {
    const Code = (props) => <CodeBlock {...props} />;
    return memo(Code);
  })(),
  blockquote: (() => {
    const BlockQuote = (props) => (
      <Typography
        style={{
          borderLeft: "4px solid grey",
          padding: 8,
          color: "grey",
          lineHeight: 1,
          margin: "1% 0% 1% 0%",
        }}
        variant="body1"
        {...props}
      />
    );
    return memo(BlockQuote);
  })(),
};

export default RemarkComponents;
