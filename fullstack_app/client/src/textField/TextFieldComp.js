import React, { Component } from 'react'
import './TextFieldComp.css'


class TextFieldComp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fileName: 'file Name',
            fileText: this.props.fileText,
            holdFileText: false
        }
    }

    componentDidMount() {
        this.setState({
            fileText: this.props.fileText,
            holdFileText: true
        })
    }

    render() {
        console.log(this.props.fileText);
        return (
            <div>
                <h1>{this.props.fileText.name}</h1>
                <p>{this.props.fileText.text}</p>
            </div>
        );
    }
}
export default TextFieldComp;