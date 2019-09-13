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
        <Link to="/questions/course/Algorithms" className="yellow">
          Algorithms
        </Link>
        <Link to="/questions/course/Hedva" className="green">
          Hedva
        </Link>
        <Link to="/questions/course/Data-Structure" className="pink">
          Data Structure
        </Link>
        <Link to="/questions/course/Architecture" className="purple">
          Architecture
        </Link>
        <Link to="/questions/course/Complexity" className="blue">
          Complexity
        </Link>
        <Link to="/questions/course/Linear-Algebra" className="orange">
          Linear Algebra
        </Link>
      </div>
    );
  }
}

export default Menu;
