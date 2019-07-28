import React, { Component } from "react";
import "./Home.css";
//import Upload from "../Upload/Upload";
//import Download from "../Download/Download";
//import TextFieldComp from "../TextField/TextFieldComp";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textToTextField: ""
    };
  }

  componentDidMount() {
    //GET message from server using fetch api
    fetch("/api/home")
      .then(res => res.text())
      .then(res => this.setState({ message: res }));
  }

  insertTextToTextField(nameAndText) {
    console.log(nameAndText);
    this.setState({
      textToTextField: nameAndText
    });
  }

  render() {
    return (
      <div className="Home">
        {/*
        <div className="home-header">
          <span>Exam Trainer!!!</span>
        </div>
        <div className="body">
          <div>
            <TextFieldComp fileText={this.state.textToTextField} />
          </div>
          <div className="Card">
            <Upload />
          </div>
          <div className="DownloadCard">
            <Download
              callbackWithText={this.insertTextToTextField.bind(this)}
            />
          </div>
        </div>
        <div className="footer"></div>
        */}
      </div>
    );
  }
}

export default Home;
