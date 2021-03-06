import "./App.css";
import React from "react";
import Login from "./components/Login/Login";
import Menu from "./components/Menu/Menu";
import Options from "./components/Options-Page/Options";
import Course from "./components/Course-Page/Course";
import Register from "./components/Register/Register";
import NewExam from "./components/PDF/NewExam";
import UpperBar from "./components/UpperBar/UpperBar";
import TagExam from "./components/AddExam/TagExam";
import Exam from "./components/Exam/Exam";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
  state = {
    isAuthenticated: "",
    username: "",
    textToTextField: "",
    questions: []
  };

  userLoggedIn = name => {
    this.setState({
      isAuthenticated: true,
      username: name
    });
  };

  insertTextToTextField(nameAndText) {
    this.setState({
      textToTextField: nameAndText
    });
  }

  generatedExam(questions) {
    this.setState({ questions: questions });
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem("userInfo"));
  }

  Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © Exams-Trainer "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  render() {
    return (
      /*on home route ('/') we check if the user is logged in
            via local storage, if he isn't we redirect him to login page */
      <React.Fragment>
        <Router>
          <div className="menu-bar">
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/questions/course" component={Menu} />
          <Route exact path="/menu" component={Options} />
          <Route
            exact
            path="/questions/course/:course_name"
            render={props => (
              <Course {...props} questions={this.generatedExam.bind(this)} />
            )}
          />
          <Route
            exact
            path="/exam"
            render={props => (
              <Exam {...props} questions={this.state.questions} />
            )}
          />
          <Route
            exact
            path="/new-exam"
            render={props => (
              <NewExam
                {...props}
                uploadedFile={this.insertTextToTextField.bind(this)}
              />
            )}
          />
          <Route
            exact
            path="/new-questions"
            render={props => (
              <TagExam {...props} fileText={this.state.textToTextField} />
            )}
          />
          <Route path="/" component={UpperBar} />
          {/*<Redirect from="/" to="/menu" />*/}
          {/*<Route
          exact
          path="/"
          render={() => {
            return <Menu />;
            const info = null; //this.getUserInfo();
            if (info === null) {
              return <Redirect to="/login" />;
            } else {
            return <Home welcome={info.username} />;
          }
        }}
      />*/}
          <this.Copyright />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
