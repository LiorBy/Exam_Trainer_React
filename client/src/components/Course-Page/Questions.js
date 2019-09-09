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
import { Link } from "react-router-dom";

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
  const [selection, setSelection] = React.useState([]);
  const [urlChanged, setUrlChanged] = React.useState(props.urlChanged);

  React.useEffect(() => {
    fetch(`/questions/course/${props.match.params.course_name}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        setQuestions(json);
      });
  }, []);

  function handleRandomClick() {
    const url = `/questions/course/${props.match.params.course_name}${props.location.search}`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        props.questions(json);
      });
  }

  function handleGenerateClick() {
    props.questions(selection);
  }

  function handleChange(e, question) {
    if (e.target.checked) {
      setSelection([...selection, question]);
    } else {
      setSelection(selection.filter(item => item._id !== question._id));
    }
  }

  function fetchQuestions() {
    fetch(window.location.href)
      .then(response => {
        return response.json();
      })
      .then(json => {
        setQuestions(json);
        setUrlChanged(false);
      });
  }

  return (
    <React.Fragment>
      {/*fetchQuestions()*/}
      <Title>Questions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>▢</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Lecturer</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Semester</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((question, index) => (
            <React.Fragment key={question._id}>
              <TableRow
                hover
                style={{ cursor: "pointer" }}
                onClick={() => setCollapsedRow(index)}
              >
                <TableCell>
                  <Checkbox
                    onChange={e => {
                      handleChange(e, question);
                    }}
                  ></Checkbox>
                </TableCell>
                <TableCell>{question.name}</TableCell>
                <TableCell>{question.lecturer}</TableCell>
                <TableCell>{question.subject}</TableCell>
                <TableCell>{question.year}</TableCell>
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
      <Grid container className="buttons" spacing={6}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            disabled={selection.length ? false : true}
            className={classes.button}
            onClick={handleGenerateClick.bind(this)}
            to="/exam"
            component={Link}
          >
            Generate Selection
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleRandomClick.bind(this)}
            to="/exam"
            component={Link}
          >
            Generate Randomly
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
