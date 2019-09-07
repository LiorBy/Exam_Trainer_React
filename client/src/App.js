import "./App.css";
import React from "react";
import Login from "./components/Login/Login";
//import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import Options from "./components/Options-Page/Options";
import Course from "./components/Course-Page/Course";
import Register from "./components/Register/Register";
import NewExam from "./components/PDF/NewExam";
import UpperBar from "./components/UpperBar/UpperBar";
import TagExam from "./components/PDF/TagExam";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
  state = {
    isAuthenticated: "",
    username: "",
    textToTextField: ""
  };

  userLoggedIn = name => {
    this.setState({
      isAuthenticated: true,
      username: name
    });
  };

  insertTextToTextField(nameAndText) {
    console.log(nameAndText);
    this.setState({
      textToTextField: nameAndText
    });
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem("userInfo"));
  }

  handleUploadedFile() {}

  render() {
    return (
      /*on home route ('/') we check if the user is logged in
            via local storage, if he isn't we redirect him to login page */
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
        <Route exact path="/courses" component={Menu} />
        <Route exact path="/menu" component={Options} />
        <Route exact path="/courses/:course_name" component={Course} />
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
      </Router>
    );
  }
}

export default App;
