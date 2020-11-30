import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const Schedule = () => (
  <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="left">Week</TableCell>
          <TableCell align="left">Topic</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell align="right">1</TableCell>
          <TableCell align="right">
            Introduction to NodeJS and MongoDB
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">2</TableCell>
          <TableCell align="right">
            Exploring Node And Express and Templates
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">3</TableCell>
          <TableCell align="right">
            No Sql data planning and modelling{" "}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">4</TableCell>
          <TableCell align="right">
            Completing the MCV stack
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">5</TableCell>
          <TableCell align="right">
            Assessment Workshop
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">6</TableCell>
          <TableCell align="right">Thinking about How to Update our Data</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">7</TableCell>
          <TableCell align="right">
            Data Modelling and Relationships
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">8</TableCell>
          <TableCell align="right">
            User Authentication
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">9</TableCell>
          <TableCell align="right">
            Deploying to a Serverless Infrastructure
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">10</TableCell>
          <TableCell align="right">Advanced Mongo Features</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">11</TableCell>
          <TableCell align="right">
            {" "}
            Advanced Mongo Features
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">12</TableCell>
          <TableCell align="right">
            Thinking About the Future of Databases and Assessment Support 
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">13</TableCell>
          <TableCell align="right">Assessment Support</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">14</TableCell>
          <TableCell align="right">Assessment Support</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
);

export { Schedule };
