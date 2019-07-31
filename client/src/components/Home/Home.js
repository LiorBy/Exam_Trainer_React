import React, { Component } from "react";
import "./Home.css";
import AdminLobby from "../Admin/AdminLobby";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textToTextField: ""
    };
  }

  render() {
    return (
      <div>
        <Router>
          <ul>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
          <Route exact path="/admin" component={AdminLobby} />
        </Router>
      </div>
    );
  }
}

export default Home;
