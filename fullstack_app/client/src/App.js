import React, { Component } from 'react'
import './App.css'
import Upload from './upload/Upload'
import Download from './download/Download';
import TextFieldComp from './textField/TextFieldComp';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      textToTextField:''
    }

  }

insertTextToTextField(nameAndText){
  console.log(nameAndText);
  this.setState({
    textToTextField:nameAndText
  })
}


  render() {
    return (
      <div className="App">
        <div className="app-header">
          <span>Exam Trainer!!!</span>
        </div>
        <div className="body">
          <div>
            <TextFieldComp fileText={this.state.textToTextField}/>
          </div>
          <div className="Card">
            <Upload />
          </div>
          <div className="DownloadCard">
            <Download callbackWithText={this.insertTextToTextField.bind(this)} />
          </div>
        </div>
        <div className="footer">
        </div>
      </div>
    )
  }
}

export default App;