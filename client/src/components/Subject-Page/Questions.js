/* eslint-disable no-script-url */

import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Title from "./Title";
import { Collapse, Checkbox } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

// Generate Question Data
function createData(id, year, name, lecturer, semester, question) {
  return { id, year, name, lecturer, semester, question };
}

const rows = [
  createData(0, "2019", "Question1", "Romina Zigdon", "B", "bla bla bla"),
  createData(1, "2017", "Question2", "Zef Segal", "A", "i'm a questions"),
  createData(2, "2015", "Question4", "Zef Segal", "A", "hey wtf"),
  createData(3, "2019", "Question10", "Iris Rosenblum", "B", "glennn"),
  createData(4, "2013", "Question6", "Shlomit Arian", "A", "praggger")
];

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

export default function Questions() {
  const classes = useStyles();
  const [collapsedRow, setCollapsedRow] = React.useState(true);

  return (
    <React.Fragment>
      <Title>Questions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>▢</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Lecturer</TableCell>
            <TableCell>Semester</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <React.Fragment key={row.id}>
              <TableRow
                hover
                style={{ cursor: "pointer" }}
                onClick={() => setCollapsedRow(index)}
              >
                <TableCell>
                  <Checkbox></Checkbox>
                </TableCell>
                <TableCell>{row.year}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.lecturer}</TableCell>
                <TableCell>{row.semester}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={3}
                >
                  <Collapse
                    in={collapsedRow === index}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Typography>{row.question}</Typography>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      <Grid container spacing={6}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Generate Selection
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Generate Randomly
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
