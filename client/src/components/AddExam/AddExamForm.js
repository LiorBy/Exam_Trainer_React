import React from "react";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import QuestionEntry from "./QuestionEntry";
import FormGroup from "@material-ui/core/FormGroup";
import { Redirect } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360
  },
  button: {
    margin: theme.spacing(1)
  },
  listItem: {
    flexDirection: "column"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

const AddExamForm = props => {
  const classes = useStyles();
  const [questions, setQuestions] = React.useState(["object"]);
  const [requests, setRequests] = React.useState([]);
  const [pass, setPass] = React.useState(false);

  function handleClick() {
    setQuestions([...questions, "object"]);
  }

  function questionData(data) {
    const index = data.number;
    let arr = [...requests];
    arr[index] = data;
    setRequests(arr);
  }

  function handleSubmit() {
    for (const request of requests) {
      fetch(`/questions`, {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
    }
    setPass(true);
  }

  if (pass === true) {
    return <Redirect to="/menu" />;
  } else {
    return (
      <React.Fragment>
        <List className={classes.root}>
          <FormGroup>
            {questions.map((question, index) => {
              return (
                <React.Fragment key={index}>
                  <QuestionEntry
                    number={index}
                    pass={pass}
                    questionData={questionData}
                  />
                </React.Fragment>
              );
            })}
          </FormGroup>
        </List>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={handleClick}
        >
          <AddIcon />
          Add Question
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </React.Fragment>
    );
  }
};

export default AddExamForm;
