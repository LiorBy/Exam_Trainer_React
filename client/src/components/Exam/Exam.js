import React from "react";

const Exam = props => {
  return (
    <div>
      {props.questions.map(question => {
        return <p>{question.content}</p>;
      })}
    </div>
  );
};

export default Exam;
