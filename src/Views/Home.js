import React, { Component } from "react";
import { Link } from "react-router-dom";
import { showFailureAlert, showLoadingAlert } from "../utilities";
import { withRouter } from "../withHooks";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            disabled: true
        };
    }

    handleLoginBtn() {
        let disabled = false;

        if (!this.state.userName || this.state.userName.length === 0 || !this.state.password || this.state.password.length === 0) disabled = true;

        this.setState({
            disabled
        });
    };

    eventHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

        this.handleLoginBtn();
    };

    async login() {
        const res = await showLoadingAlert("login", { ...this.state });
            const srvData = res?.data;

            if (!srvData.success) {
                await showFailureAlert(srvData.message);
            } else {
                localStorage.setItem("token", srvData.token);
                localStorage.setItem("userID", srvData.userID);
                this.props.navigate('/feed');
            }
    };

    render() {
        return (
            <div className="background">
                <div className="container">
                    <h1 className="cursive">Title</h1>
                    <input placeholder="Username" name="userName" onChange={this.eventHandler.bind(this)}/>
                    <input placeholder="Password" name="password" onChange={this.eventHandler.bind(this)} type="password"/>
                    <button disabled={this.state.disabled} onClick={this.login.bind(this)}>Log In</button>
                </div>
                <div className="small-container">
                    <p>Don't have an account? <Link to={"/signup"}><span className="blue-link">Sign up</span></Link></p>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);
