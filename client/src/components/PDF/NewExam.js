import React, { Component } from "react";
import Upload from "./Upload";
import Download from "./Download";
import { Redirect } from "react-router-dom";

class NewExam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textToTextField: "",
      isUploaded: false,
      isRedirected: false
    };
  }

  insertTextToTextField(nameAndText) {
    this.props.uploadedFile(nameAndText);
    this.setState({
      isRedirected: !this.state.isRedirected
    });
  }

  updateUploadState(state) {
    this.setState({
      isUploaded: state
    });
  }

  render() {
    if (this.state.isRedirected === true) {
      return <Redirect to="/new-questions" />;
    } else {
      return (
        <div className="home-header">
          <div className="body">
            <div className="Card">
              <Upload isUploaded={this.updateUploadState.bind(this)} />
            </div>
            <div className="DownloadCard">
              <div className="download-container">
                {this.state.isUploaded ? (
                  <Download
                    callbackWithText={this.insertTextToTextField.bind(this)}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default NewExam;
