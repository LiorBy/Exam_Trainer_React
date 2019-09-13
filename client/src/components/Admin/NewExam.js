import React, { Component } from "react";
import Upload from "../PDF/Upload";
import Download from "../PDF/Download";
import TextFieldComp from "../PDF/TextFieldComp";

class NewExam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textToTextField: ""
    };
  }

  insertTextToTextField(nameAndText) {
    this.setState({
      textToTextField: nameAndText
    });
  }

  render() {
    return (
      <div className="home-header">
        <div className="body">
          <TextFieldComp fileText={this.state.textToTextField} />
          <div className="Card">
            <Upload />
          </div>
          <div className="DownloadCard">
            <div className="download-container">
              <Download
                callbackWithText={this.insertTextToTextField.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewExam;
