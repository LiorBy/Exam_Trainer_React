import React, { Component } from 'react';
import axios from 'axios';


export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        };
    }


    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    // onSubmit = (event) => {
    //     event.preventDefault();
    //     axios({
    //         method: 'POST',
    //         url: `localhost:8000/userRegister`,
    //         body: JSON.stringify(this.state),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(res => {
    //             if (res.status === 200) {
    //                 this.props.history.push('/');
    //             } else {
    //                 console.log("i'm here")
    //                 const error = new Error(res.error);
    //                 throw error;
    //             }
    //         })
    //         .catch(err => {
    //             console.error(err);
    //             alert('Error registeration in, please try again');
    //         });
    // }




onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/userRegister', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status === 200) {
                this.props.history.push('/');
            } else {
                console.log("i'm here")
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            console.error(err);
            alert('Error registeration in, please try again');
        });
}

render() {
    return (
        <form onSubmit={this.onSubmit}>
            <h1>Create new user!</h1>
            <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handleInputChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={this.state.password}
                onChange={this.handleInputChange}
                required
            />
            <input type="submit" value="Register" />
        </form>
    );
}
}