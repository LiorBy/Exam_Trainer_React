import React, { Component } from "react";
import ReactBootstrap, { Button, ButtonToolbar } from 'react-bootstrap'

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }



    handleClickYes = () => {
        localStorage.removeItem('currentUser');
    }


    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Are you sure you want to logout??</h1>
                <ButtonToolbar>
                    <Button variant="primary" size="lg" onClick={this.handleClickYes}>
                        Yes
                      </Button>
                    <Button variant="secondary" size="lg" onClick={this.handleClickNo}>
                        No
                    </Button>
                </ButtonToolbar>
            </form>
        );
    }
}
