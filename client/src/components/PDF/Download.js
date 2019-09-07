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
  }

  componentDidMount() {
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
      .then(() => {
        const lastItem = this.state.allFilesName.slice(-1)[0];
        axios.get(`/download?id=${lastItem._id}`).then(res => {
          let onlyText = res.data.text.text;
          let fileName = res.data.text.name;
          let nameAndText = { name: fileName, text: onlyText };
          console.log(onlyText);
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
