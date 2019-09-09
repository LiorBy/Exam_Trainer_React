import React from "react";
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

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
});

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course_name: this.props.match.params.course_name,
      questions: []
    };

    this.getYears = this.getYears.bind(this);
    this.getLecturers = this.getLecturers.bind(this);
    this.getSemesters = this.getSemesters.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(`/questions/course/${this.state.course_name}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({
          questions: json
        });
      });
  }

  handleClick = e => {
    this.setState({ [e]: !this.state[e] });
  };

  handleChange = (key, value) => event => {
    let url = `/questions/course/${this.state.course_name}`;
    let currUrl = new URL(window.location.href);
    let queryString = new URLSearchParams(currUrl.search.slice(1));
    queryString.append(key, value);

    const newUrl = `${url}?${queryString.toString()}`;
    this.props.history.push(newUrl);
    this.props.urlChanged(true);

    /*
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set(key, value);
    this.props.history.push(
      window.location.pathname + "?" + currentUrlParams.toString()
    );
    */
    /*
    fetch(newUrl)
      .then(res => {
        return res.json();
      })
      .then(json => {
        console.log(json);
      });
      */
    /*
    if (event.target.checked) {
      let currentUrlParams = new URLSearchParams(window.location.search);
      currentUrlParams.set(key, value);
      this.props.history.push(
        window.location.pathname + "?" + currentUrlParams.toString()
      );
      this.props.urlChanged(true);
    } else {
    }*/
  };

  render() {
    const { classes } = this.props;
    const { questions } = this.state;
    const years = questions.length ? this.getYears() : [];
    const lecturers = questions.length ? this.getLecturers() : [];
    const semesters = questions.length ? this.getSemesters() : [];
    const subjects = questions.length ? this.getSubjects() : [];

    return (
      <div>
        <List
          className={classes.root}
          subheader={<ListSubheader>{this.state.course_name}</ListSubheader>}
        >
          <ListItem button onClick={this.handleClick.bind(this, "year")}>
            <ListItemIcon>
              <EventTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="Year" />
            {this.state.year ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.year} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <FormGroup>
                {years.map(item => {
                  return (
                    <FormControlLabel
                      key={item._id}
                      control={
                        <Checkbox
                          onChange={
                            this.handleChange("year", item.year)
                            //this.handleChange.bind(this, e, "year", item.year)
                          }
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
          <ListItem button onClick={this.handleClick.bind(this, "lecturer")}>
            <ListItemIcon>
              <FaceTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="Lecturer" />
            {this.state.lecturer ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.lecturer} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <FormGroup>
                {lecturers.map(item => {
                  return (
                    <FormControlLabel
                      key={item._id}
                      control={
                        <Checkbox
                          onChange={e =>
                            this.handleChange.bind(
                              this,
                              e,
                              "lecturer",
                              item.lecturer
                            )
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
          <ListItem button onClick={this.handleClick.bind(this, "semester")}>
            <ListItemIcon>
              <LocalOfferTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="Semester" />
            {this.state.semester ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.semester} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <FormGroup>
                {semesters.map(item => {
                  return (
                    <FormControlLabel
                      key={item._id}
                      control={
                        <Checkbox
                          onChange={e =>
                            this.handleChange.bind(
                              this,
                              e,
                              "semester",
                              item.semester
                            )
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
          <ListItem button onClick={this.handleClick.bind(this, "subject")}>
            <ListItemIcon>
              <SubjectRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Subject" />
            {this.state.subject ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.subject} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <FormGroup>
                {subjects.map(item => {
                  return (
                    <FormControlLabel
                      key={item._id}
                      control={
                        <Checkbox
                          onChange={e =>
                            this.handleChange.bind(
                              this,
                              e,
                              "subject",
                              item.subject
                            )
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
      </div>
    );
  }

  getYears() {
    const seen = new Set();
    let yearsList = [];
    for (const exam of this.state.questions) {
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

    return yearsList;
  }

  getLecturers() {
    const seen = new Set();
    let lecturersList = [];
    for (const exam of this.state.questions) {
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

    return lecturersList;
  }

  getSemesters() {
    const seen = new Set();
    let semestersList = [];
    for (const exam of this.state.questions) {
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

    return semestersList;
  }

  getSubjects() {
    const seen = new Set();
    let subjectsList = [];
    for (const exam of this.state.questions) {
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

    return subjectsList;
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
