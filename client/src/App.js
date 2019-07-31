import "./App.css";
import React from "react";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
        {<Route exact path="/login" component={Login} />}
        {<Route exact path="/register" component={Register} />}
        <Route
          exact
          path="/"
          render={() => {
            return <Home />;
            const info = this.getUserInfo();
            if (info === null) {
              return <Redirect to="/login" />;
            } else {
              return <Home welcome={info.username} />;
            }
          }}
        />
      </Router>
    );
  }
}

export default App;
