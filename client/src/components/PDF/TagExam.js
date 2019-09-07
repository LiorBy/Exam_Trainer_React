import React from "react";
import { Link } from "react-router-dom";
import TextFieldComp from "./TextFieldComp";
import "./TagExam.css";

const TagExam = props => {
  return (
    <div className="tag-exam">
      <TextFieldComp fileText={props.fileText} />
    </div>
  );
};

export default TagExam;
