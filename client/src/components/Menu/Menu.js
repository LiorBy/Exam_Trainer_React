import React, { Component } from "react";
import "./Menu.css";
import { Link } from "react-router-dom";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="menu">
        <Link to="/courses/Algorithms" className="yellow">
          Algorithms
        </Link>
        <Link to="/courses/Hedva" className="green">
          Hedva
        </Link>
        <Link to="/courses/Data-Structure" className="pink">
          Data Structure
        </Link>
        <Link to="/courses/Architecture" className="purple">
          Architecture
        </Link>
        <Link to="/courses/Complexity" className="blue">
          Complexity
        </Link>
        <Link to="/courses/Linear-Algebra" className="orange">
          Linear Algebra
        </Link>
      </div>
    );
  }
}

export default Menu;
