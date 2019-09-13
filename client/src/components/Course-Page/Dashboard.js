import React from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Sidebar from "./Sidebar";
import Questions from "./Questions";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Title from "./Title";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import EventTwoToneIcon from "@material-ui/icons/EventTwoTone";
import FaceTwoToneIcon from "@material-ui/icons/FaceTwoTone";
import SubjectRoundedIcon from "@material-ui/icons/SubjectRounded";
import LocalOfferTwoToneIcon from "@material-ui/icons/LocalOfferTwoTone";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  sideroot: {
    width: "100%",
    maxWidth: 360
  },
  root: {
    display: "flex"
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  marginleft: {
    marginLeft: "20px"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    width: "100%"
  },
  button: {
    margin: theme.spacing(1),
    justifyContent: "space-between"
  },
  input: {
    display: "none"
  },
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const [urlChanged, setUrlChanged] = React.useState(false);
  const [collapsedRow, setCollapsedRow] = React.useState(true);
  const [questions, setQuestions] = React.useState([]);
  const [selection, setSelection] = React.useState([]);
  const [years, setYears] = React.useState([]);
  const [lecturers, setLecturers] = React.useState([]);
  const [semesters, setSemesters] = React.useState([]);
  const [subjects, setSubjects] = React.useState([]);
  const [values, setValues] = React.useState({
    year: false,
    lecture: false,
    semester: false,
    subject: false
  });

  React.useEffect(() => {
    fetch(`/questions/course/${props.match.params.course_name}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        setQuestions(json);
        return json;
      })
      .then(questions => {
        getYears(questions);
        getLecturers(questions);
        getSemesters(questions);
        getSubjects(questions);
      });
  }, []);

  //const years = questions.length ? getYears() : [];
  //const lecturers = questions.length ? getLecturers() : [];
  //const semesters = questions.length ? getSemesters() : [];
  //const subjects = questions.length ? getSubjects() : [];

  function handleClick(name) {
    setValues({ ...values, [name]: !values[name] });
  }

  function handleUrlChanged(state) {
    setUrlChanged(state);
  }

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

  function handleTagChange(key, value, event) {
    if (event.target.checked) {
      let url = `/questions/course/${props.match.params.course_name}`;
      let currUrl = new URL(window.location.href);
      let queryString = new URLSearchParams(currUrl.search.slice(1));
      queryString.append(key, value);

      const newUrl = `${url}?${queryString.toString()}`;
      props.history.push(newUrl);
      fetchQuestions();
    } else {
    }
  }

  function getYears(questions) {
    const seen = new Set();
    let yearsList = [];
    for (const exam of questions) {
      yearsList.push({ _id: exam._id, year: exam.year });
    }
    yearsList = yearsList.filter(el => {
      const duplicate = seen.has(el.year);
      seen.add(el.year);
      return !duplicate;
    });

    yearsList.sort((a, b) => {
      return a.year - b.year;
    });

    setYears(yearsList);
  }

  function getLecturers(questions) {
    const seen = new Set();
    let lecturersList = [];
    for (const exam of questions) {
      lecturersList.push({ _id: exam._id, lecturer: exam.lecturer });
    }
    lecturersList = lecturersList.filter(el => {
      const duplicate = seen.has(el.lecturer);
      seen.add(el.lecturer);
      return !duplicate;
    });

    lecturersList.sort((a, b) => {
      return a.lecturer > b.lecturer ? 1 : b.lecturer > a.lecturer ? -1 : 0;
    });

    setLecturers(lecturersList);
  }

  function getSemesters(questions) {
    const seen = new Set();
    let semestersList = [];
    for (const exam of questions) {
      semestersList.push({ _id: exam._id, semester: exam.semester });
    }
    semestersList = semestersList.filter(el => {
      const duplicate = seen.has(el.semester);
      seen.add(el.semester);
      return !duplicate;
    });

    semestersList.sort((a, b) => {
      return a.semester > b.semester ? 1 : b.semester > a.semester ? -1 : 0;
    });

    setSemesters(semestersList);
  }

  function getSubjects(questions) {
    const seen = new Set();
    let subjectsList = [];
    for (const exam of questions) {
      subjectsList.push({ _id: exam._id, subject: exam.subject });
    }
    subjectsList = subjectsList.filter(el => {
      const duplicate = seen.has(el.subject);
      seen.add(el.subject);
      return !duplicate;
    });

    subjectsList.sort((a, b) => {
      return a.subject > b.subject ? 1 : b.subject > a.subject ? -1 : 0;
    });

    setSubjects(subjectsList);
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

  Sidebar.propTypes = {
    classes: PropTypes.object.isRequired
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, classes.drawerPaperClose)
        }}
      >
        <List
          className={classes.sideroot}
          subheader={
            <ListSubheader>{props.match.params.course_name}</ListSubheader>
          }
        >
          <ListItem button onClick={e => handleClick("year")}>
            <ListItemIcon>
              <EventTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="Year" />
            {values.year ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={values.year} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <FormGroup className={classes.marginleft}>
                {years.map(item => {
                  return (
                    <FormControlLabel
                      key={item._id}
                      control={
                        <Checkbox
                          onChange={e => {
                            handleTagChange("year", item.year, e);
                          }}
                        />
                      }
                      label={item.year}
                    />
                  );
                })}
              </FormGroup>
            </List>
          </Collapse>
          <Divider />
          <ListItem button onClick={e => handleClick("lecturer")}>
            <ListItemIcon>
              <FaceTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="Lecturer" />
            {values.lecturer ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={values.lecturer} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <FormGroup className={classes.marginleft}>
                {lecturers.map(item => {
                  return (
                    <FormControlLabel
                      key={item._id}
                      control={
                        <Checkbox
                          onChange={e =>
                            handleTagChange("lecturer", item.lecturer, e)
                          }
                        />
                      }
                      label={item.lecturer}
                    />
                  );
                })}
              </FormGroup>
            </List>
          </Collapse>
          <Divider />
          <ListItem button onClick={e => handleClick("semester")}>
            <ListItemIcon>
              <LocalOfferTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="Semester" />
            {values.semester ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={values.semester} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <FormGroup className={classes.marginleft}>
                {semesters.map(item => {
                  return (
                    <FormControlLabel
                      key={item._id}
                      control={
                        <Checkbox
                          onChange={e =>
                            handleTagChange("semester", item.semester, e)
                          }
                        />
                      }
                      label={item.semester}
                    />
                  );
                })}
              </FormGroup>
            </List>
          </Collapse>
          <Divider />
          <ListItem button onClick={e => handleClick("subject")}>
            <ListItemIcon>
              <SubjectRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Subject" />
            {values.subject ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={values.subject} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <FormGroup className={classes.marginleft}>
                {subjects.map(item => {
                  return (
                    <FormControlLabel
                      key={item._id}
                      control={
                        <Checkbox
                          onChange={e =>
                            handleTagChange("subject", item.subject, e)
                          }
                        />
                      }
                      label={item.subject}
                    />
                  );
                })}
              </FormGroup>
            </List>
          </Collapse>
        </List>
        {/*<Sidebar {...props} urlChanged={handleUrlChanged} />*/}
      </Drawer>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item>
              <Paper className={classes.paper}>
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
                <Grid container className={classes.button}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={selection.length ? false : true}
                      className={classes.button}
                      onClick={handleGenerateClick}
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
                      onClick={handleRandomClick}
                      to="/exam"
                      component={Link}
                    >
                      Generate Randomly
                    </Button>
                  </Grid>
                </Grid>
                {/*<Questions {...props} urlChanged={urlChanged} />*/}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );

  /*
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, classes.drawerPaperClose)
        }}
      >
        <Sidebar {...props} urlChanged={handleUrlChanged} />
      </Drawer>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item>
              <Paper className={classes.paper}>
                <Questions {...props} urlChanged={urlChanged} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
  */
}
