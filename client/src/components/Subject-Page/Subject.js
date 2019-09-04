import React, { Component } from "react";
import Dashboard from "./Dashboard";

class Subject extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="subject">
        <Dashboard></Dashboard>
      </div>
    );
  }
}

export default Subject;
