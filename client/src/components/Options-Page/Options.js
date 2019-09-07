import React from "react";
import { Link } from "react-router-dom";

import "./Options.css";

const Options = () => {
  return (
    <div className="options">
      <Link to="/new-exam" className="yellow">
        Add an Exam
      </Link>
      <Link to="/courses" className="blue">
        Generate an Exam
      </Link>
    </div>
  );
};

export default Options;
