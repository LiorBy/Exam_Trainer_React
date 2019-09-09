import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles(theme => ({
  column: {
    flexDirection: "column"
  },
  row: {
    flexDirection: "row"
  },
  container: {
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    display: "flex",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  formControl: {
    margin: theme.spacing(1)
  }
}));

const QuestionEntry = props => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    number: `${props.number}`,
    name: "",
    lecturer: "",
    course: "",
    year: "",
    semester: "",
    subject: "",
    content: "",
    solution: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    props.questionData(values);
  };

  function handleQuestionExpansion() {
    setOpen(!open);
  }

  return (
    <React.Fragment>
      <ListItem button onClick={handleQuestionExpansion.bind(this)}>
        <ListItemIcon>
          <HelpOutlineOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={`Question #${props.number + 1}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        className={classes.column}
      >
        <List className={classes.column}>
          <TextField
            id="standard-name"
            label="Name"
            placeholder={`Question #${props.number + 1}`}
            className={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
          />
          <TextField
            id="lecturer"
            label="Lecturer"
            placeholder="Gal Mazor"
            className={classes.textField}
            value={values.lecturer}
            onChange={handleChange("lecturer")}
            margin="normal"
          />
          <TextField
            id="course"
            label="Course"
            placeholder="Algorithms"
            className={classes.textField}
            value={values.course}
            onChange={handleChange("course")}
            margin="normal"
          />
          <TextField
            id="subject"
            label="Subject"
            placeholder="Floyd-Warshall"
            className={classes.textField}
            value={values.subject}
            onChange={handleChange("subject")}
            margin="normal"
          />
          <TextField
            id="year"
            label="Year"
            placeholder="2019"
            className={classes.textField}
            value={values.year}
            onChange={handleChange("year")}
            margin="normal"
          />
          <FormControl className={classes.formControl}>
            <FormLabel component="legend">Semester</FormLabel>
            <RadioGroup
              className={classes.row}
              aria-label="semester"
              name="semester"
              value={values.semester}
              onChange={handleChange("semester")}
            >
              <FormControlLabel
                value="A"
                control={<Radio color="primary" />}
                label="A"
                labelPlacement="start"
              />
              <FormControlLabel
                value="B"
                control={<Radio color="primary" />}
                label="B"
                labelPlacement="start"
              />
              <FormControlLabel
                value="C"
                control={<Radio color="primary" />}
                label="C"
                labelPlacement="start"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            id="content"
            label="Question"
            className={classes.textField}
            value={values.content}
            onChange={handleChange("content")}
            margin="normal"
            variant="outlined"
            placeholder="How many miles separate USA and Canada?"
            multiline
          />
          <TextField
            id="solution"
            label="Solution"
            className={classes.textField}
            value={values.solution}
            onChange={handleChange("solution")}
            margin="normal"
            variant="outlined"
            placeholder="0 Miles!"
            multiline
          />
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default QuestionEntry;
