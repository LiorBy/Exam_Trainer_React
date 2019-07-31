import React, { Component } from "react";
import "./Download.css";
import axios from "axios";

class Download extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filesInDB: false,
      allFilesAsText: [],
      allFilesName: [],
      fileTextThatClicked: ""
    };
    this.displyFilesList = this.displyFilesList.bind(this);
    this.sendRequestToGetFileText = this.sendRequestToGetFileText.bind(this);
    this.sendRequestToGetFilesNames = this.sendRequestToGetFilesNames.bind(
      this
    );
    this.getAllTextClick = this.getAllTextClick.bind(this);
  }

  sendRequestToGetFilesNames() {
    axios
      .get("/download?getOnlyNames=1")
      .then(res => {
        const allNamesFromDB = res.data.names;
        let namesArray = allNamesFromDB.map(item => {
          return item;
        });
        console.log(allNamesFromDB);
        console.log(namesArray);
        this.setState({ allFilesName: namesArray });
      })
      .catch(err => console.log(err));
  }

  sendRequestToGetFileText(fileID) {
    axios
      .get(`/download?id=${fileID}`)
      .then(res => {
        let onlyText = res.data.text.text;
        let fileName = res.data.text.name;
        let nameAndText = { name: fileName, text: onlyText };
        console.log(onlyText);
        this.setState({ fileTextThatClicked: onlyText });
        this.props.callbackWithText(nameAndText);
      })
      .catch(err => console.log(err));
  }

  getAllTextClick(fileID) {
    console.log("getAllTextClick() " + fileID);
    this.sendRequestToGetFileText(fileID);
  }

  displyFilesList() {
    console.log("displyFilesList()");
    this.sendRequestToGetFilesNames();
  }

  render() {
    let allNames = this.state.allFilesName.map((item, i) => {
      return (
        <li
          onClick={() => this.getAllTextClick(item._id)}
          data-id={i}
          key={item._id}
        >
          {item.name}
        </li>
      );
    });
    return (
      <div>
        <button onClick={this.displyFilesList}>Files From DB</button>
        <div>
          <div className="download-container">
            <ul>{allNames}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Download;
