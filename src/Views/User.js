import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../api";
const profile = require("../assets/default-profile-picture.PNG");

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        console.log("this.props.obj: ", this.props.obj)
        console.log("this.state.liked: ", this.state.liked)
    }

    render() {
        return (
            <div className="post">
                <div className="row">
                <img className="post-profile-picture" src={profile}/>
                <Link to={{ pathname: `/profile/${this.props.obj.ID}` }} ><p><strong>{this.props.obj.fullName}</strong> @{this.props.obj.userName}</p></Link>
                </div>
            </div>
        );
    }
}

export default User;
