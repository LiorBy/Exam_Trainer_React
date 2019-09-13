import React, { Component } from "react";
import "./Download.css";

class Download extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filesInDB: false,
      allFilesAsText: [],
      allFilesName: [],
      fileTextThatClicked: ""
    };
  }

  componentDidMount() {
    fetch("download")
      .then(response => {
        return response.json();
      })
      .then(json => {
        const allNamesFromDB = json.names;
        const lastItemId = allNamesFromDB[allNamesFromDB.length - 1]._id;
        fetch(`download/${lastItemId}`)
          .then(response => {
            return response.json();
          })
          .then(file => {
            let onlyText = file.file.text;
            let fileName = file.file.name;
            let nameAndText = { name: fileName, text: onlyText };
            this.setState({ fileTextThatClicked: onlyText });
            this.props.callbackWithText(nameAndText);
          });
      });
  }

  render() {
    return <div></div>;
  }
}

export default Download;
