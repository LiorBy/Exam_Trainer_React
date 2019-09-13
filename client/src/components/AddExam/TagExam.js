import React from "react";
import TextFieldComp from "../PDF/TextFieldComp";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import AddExamForm from "./AddExamForm";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  tagExam: {
    border: "10px solid black",
    margin: "10px",
    maxWidth: "1000px"
  },

  container: {
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "wrap",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
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
  },
  root: {
    display: "flex"
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
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    width: "100%"
  }
}));

const TagExam = props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container className={classes.container} direction="row">
        <Grid item>
          <CssBaseline />
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, classes.drawerPaperClose)
            }}
          >
            <AddExamForm />
          </Drawer>
        </Grid>
        <Grid item>
          <div className={classes.tagExam}>
            <TextFieldComp fileText={props.fileText} />
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default TagExam;
