import React, { Component } from "react";
import "./Menu.css";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  render() {
    return (
      <div className="menu">
        <a class="yellow" href="#">Algorithms</a>
		<a class="green" href="#">Calculus</a>
		<a class="pink" href="#">Data Structure</a>
		<a class="purple" href="#">Architecture</a>
		<a class="blue" href="#">Complexity</a>
		<a class="orange" href="#">Linear Algebra</a>
      </div>
    );
  }
}

export default Menu;
