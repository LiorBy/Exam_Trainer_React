import React, { Component } from "react";
import "./TextFieldComp.css";

class TextFieldComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: "file Name",
      fileText: this.props.fileText,
      holdFileText: false
    };
  }

  componentDidMount() {
    this.setState({
      fileText: this.props.fileText,
      holdFileText: true
    });
  }

  render() {
    return (
      <div className="pdf-text-container">
        <h1>{this.props.fileText.name}</h1>
        <pre>{this.props.fileText.text}</pre>
      </div>
    );
  }
}
export default TextFieldComp;
