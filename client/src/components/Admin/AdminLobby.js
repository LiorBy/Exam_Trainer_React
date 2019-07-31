import React, { Component } from "react";
import NewExam from "./NewExam";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class AdminLobby extends Component {
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
              <Link to="/admin/newexam">Add a new exam</Link>
            </li>
            <li>
              <Link to="/admin/editexam">Edit an exam</Link>
            </li>
          </ul>
          <Route exact path="/admin/newexam" component={NewExam} />
          <Route
            exact
            path="/admin/editexam"
            render={() => {
              return <p>edit exam</p>;
            }}
          />
        </Router>
      </div>
    );
  }
}

export default AdminLobby;
