import React, { Component } from "react";
import Upload from "./Upload";
import Download from "./Download";
import TextFieldComp from "./TextFieldComp";
import { Redirect } from "react-router-dom";

class NewExam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textToTextField: "",
      isUploaded: false
    };
  }

  insertTextToTextField(nameAndText) {
    console.log(nameAndText);
    this.setState({
      textToTextField: nameAndText
    });
  }

  updateUploadState(state) {
    this.setState({
      isUploaded: state
    });
  }

  render() {
    if (this.state.isUploaded === true) {
      return <Redirect to="/new-questions" />;
    } else {
      return (
        <div className="home-header">
          <div className="body">
            <TextFieldComp fileText={this.state.textToTextField} />
            <div className="Card">
              <Upload isUploaded={this.updateUploadState.bind(this)} />
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
}

export default NewExam;
