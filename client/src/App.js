import "./App.css";
import React from "react";
import Login from "./components/Login/Login";
//import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import Course from "./components/Course-Page/Course";
import Register from "./components/Register/Register";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./components/Menu/Menu.css";

class App extends React.Component {
  state = {
    isAuthenticated: "",
    username: ""
  };

  userLoggedIn = name => {
    this.setState({
      isAuthenticated: true,
      username: name
    });
  };

  getUserInfo() {
    return JSON.parse(localStorage.getItem("userInfo"));
  }

  render() {
    return (
      /*on home route ('/') we check if the user is logged in
            via local storage, if he isn't we redirect him to login page */
      <Router>
        <div className="menu-bar">
          <ul>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
          <div className="menu-bar-text">Exam-Trainer</div>
        </div>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/course/:course_name" component={Course} />
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
