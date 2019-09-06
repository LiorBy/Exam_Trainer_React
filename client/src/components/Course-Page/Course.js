import React, { Component } from "react";
import Dashboard from "./Dashboard";

class Course extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render(props) {
    return (
      <div className="course">
        <Dashboard {...this.props}></Dashboard>
      </div>
    );
  }
}

export default Course;
