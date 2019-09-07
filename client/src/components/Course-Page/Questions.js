/* eslint-disable no-script-url */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Title from "./Title";
import { Collapse, Checkbox } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

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

export default function Questions(props) {
  const classes = useStyles();
  const [collapsedRow, setCollapsedRow] = React.useState(true);
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    fetch(`/questions/course/${props.match.params.course_name}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        setQuestions(json);
      });
  }, []);

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
          {questions.map((question, index) => (
            <React.Fragment key={question.id}>
              <TableRow
                hover
                style={{ cursor: "pointer" }}
                onClick={() => setCollapsedRow(index)}
              >
                <TableCell>
                  <Checkbox></Checkbox>
                </TableCell>
                <TableCell>{question.year}</TableCell>
                <TableCell>{question.name}</TableCell>
                <TableCell>{question.lecturer}</TableCell>
                <TableCell>{question.semester}</TableCell>
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
                    <Typography>{question.content}</Typography>
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
