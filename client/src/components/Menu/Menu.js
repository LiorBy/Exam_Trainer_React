import React, { Component } from "react";
import "./Menu.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="menu">
        <Link to="/course/Algorithms" className="yellow">
          Algorithms
        </Link>
        <Link to="/course/Hedva" className="green">
          Hedva
        </Link>
        <Link to="/course/Data-Structure" className="pink">
          Data Structure
        </Link>
        <Link to="/course/Architecture" className="purple">
          Architecture
        </Link>
        <Link to="/course/Complexity" className="blue">
          Complexity
        </Link>
        <Link to="/course/Linear-Algebra" className="orange">
          Linear Algebra
        </Link>
      </div>
    );
  }
}

export default Menu;
