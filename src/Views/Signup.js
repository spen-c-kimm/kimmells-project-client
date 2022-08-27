import React, { Component } from "react";
import { Link } from "react-router-dom";
import { showSuccessAlert, showFailureAlert, showLoadingAlert } from "../utilities";
import { withRouter } from "../withRouter";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            userName: "",
            password: "",
            confirmPassword: "",
            disabled: true
        };
    };

    handleSignupBtn() {
        let disabled = false;

        const fields = Object.keys(this.state).filter((e) => e !== "disabled");

        for (const field of fields) {
            if (!this.state[field] || this.state[field].length === 0) disabled = true;
        }

        this.setState({
            disabled
        });
    };

    eventHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

        this.handleSignupBtn();
    };

    async createUser() {
        if (this.state.password !== this.state.confirmPassword) {
            showFailureAlert("Passwords do not match.", "Warning");
        } else {

            const res = await showLoadingAlert("signup", { ...this.state });
            const srvData = res?.data;

            if (!srvData.success) {
                await showFailureAlert(srvData.message);
            } else {
                localStorage.setItem("token", srvData.token);
                await showSuccessAlert("New profile created successfully.");
                this.props.navigate('/');
            }
        }
    };

    render() {
        return (
            <div>
                <div>
                    <h1>Title</h1>
                    <h2>Sub Title</h2>
                    <input placeholder="Full Name" name="fullName" onChange={this.eventHandler.bind(this)} />
                    <input placeholder="Username" name="userName" onChange={this.eventHandler.bind(this)} />
                    <input placeholder="Password" name="password" onChange={this.eventHandler.bind(this)} type="password"/>
                    <input placeholder="Confirm Password" name="confirmPassword" onChange={this.eventHandler.bind(this)} type="password"/>
                    <button onClick={this.createUser.bind(this)} disabled={this.state.disabled}>Sign up</button>
                </div>
                <div>
                    <p>Have an account? <Link to={"/"}><span>Log in</span></Link></p>
                </div>
            </div>
        );
    }
};

export default withRouter(Signup);
