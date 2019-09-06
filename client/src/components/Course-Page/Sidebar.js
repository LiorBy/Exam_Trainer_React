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
    //background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
  },
  nested: {
    paddingLeft: theme.spacing(4)
    //background: "linear-gradient(45deg, #FE6B3B 30%, #FF8D53 90%)"
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
  }

  componentDidMount() {
    fetch(`/questions/course/${this.state.course_name}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
        this.setState({
          questions: json
        });
      });
  }

  handleClick = e => {
    this.setState({ [e]: !this.state[e] });
  };

  render() {
    const { classes } = this.props;
    const { questions } = this.state;
    const years = questions.length ? this.getYears() : [];
    const lecturers = questions.length ? this.getLecturers() : [];

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
              <FormGroup column>
                {years.map(item => {
                  return (
                    <FormControlLabel
                      control={<Checkbox />}
                      key={item.id}
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
              <FormGroup column>
                {lecturers.map(item => {
                  return (
                    <FormControlLabel
                      control={<Checkbox />}
                      key={item.id}
                      label={item.lecturer}
                    />
                  );
                })}
              </FormGroup>
            </List>
          </Collapse>
          <Divider />
          <ListItem button onClick={this.handleClick.bind(this, "tags")}>
            <ListItemIcon>
              <LocalOfferTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="Tags" />
            {this.state.tags ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </List>
      </div>
    );
  }

  getYears() {
    const seen = new Set();
    let yearsList = [];
    for (const exam of this.state.questions) {
      yearsList.push({ id: exam.id, year: exam.year });
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
      lecturersList.push({ id: exam.id, lecturer: exam.lecturer });
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
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
