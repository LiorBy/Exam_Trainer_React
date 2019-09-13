import React, { Component } from "react";
import Dashboard from "./Dashboard";

export default function Course(props) {
  return (
    <div className="course">
      <Dashboard {...props}></Dashboard>
    </div>
  );
}
