import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import WbIncandescentOutlinedIcon from "@material-ui/icons/WbIncandescentOutlined";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/user/erondu)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)"
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0
    }
  },
  solution: {
    backgroundColor: "#E1D9C6",
    margin: "5px",
    borderRadius: "20px",
    border: "0.4px solid black"
  },
  card: {
    display: "flex"
  },
  cardDetails: {
    flex: 1
  },
  shadow: {
    margin: 10
  }
});

class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleClick = e => {
    this.setState({ [e]: !this.state[e] });
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <List>
          {this.props.questions.map((question, index) => {
            return (
              <React.Fragment key={question._id}>
                {/*<div className={classes.overlay} />*/}
                <Grid container className={classes.shadow}>
                  <Grid item md={6}>
                    <Card className={classes.card}>
                      <div className={classes.mainFeaturedPostContent}>
                        <CardContent>
                          <Typography
                            component="h1"
                            variant="h3"
                            color="inherit"
                            gutterBottom
                          >
                            Question {index + 1}
                          </Typography>
                          <Typography variant="h5" color="inherit" paragraph>
                            {question.content}
                          </Typography>
                        </CardContent>
                      </div>
                    </Card>
                  </Grid>
                </Grid>
              </React.Fragment>
            );
          })}
        </List>
        <Divider />
        <List>
          {this.props.questions.map((question, index) => {
            const num = index + 1;
            if (question.solution === "") {
              return null;
            } else {
              return (
                <React.Fragment key={question._id}>
                  <ListItem
                    button
                    className={classes.solution}
                    onClick={this.handleClick.bind(this, index)}
                  >
                    <ListItemIcon>
                      <WbIncandescentOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Solution for Question " + num} />
                    {this.state[index] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={this.state[index]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <Card>
                        <CardContent>
                          <Typography>{question.solution}</Typography>
                        </CardContent>
                      </Card>
                    </List>
                  </Collapse>
                </React.Fragment>
              );
            }
          })}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(Exam);
