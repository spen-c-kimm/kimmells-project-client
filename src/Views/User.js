import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../api";
const profile = require("../assets/default-profile-picture.PNG");

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            following: props.obj?.following
        };
    }

    async followUser() {
        let following = this.state.following;
        const followerID = localStorage.getItem("userID");
        const followingID = this.props.obj.ID;

        if (following === 0) {
            following = 1;
        } else {
            following = 0;
        }

        await api("followUser", { followerID, followingID }, true);

        this.setState({ following });
    }

    render() {
        return (
            <div className="post">
                <div className="row">
                    <div className="profile-banner row">
                        <img className="post-profile-picture" src={profile} />
                        <Link to={{ pathname: `/profile/${this.props.obj.ID}` }} ><p><strong>{this.props.obj.fullName}</strong> @{this.props.obj.userName}</p></Link>
                    </div>
                    <div style={{ display: "flex", height: "5vh", alignItems: "center" }}><button className={`followBtn userFollow ${this.state.following === 1 ? "blackBtn" : ""}`} onClick={this.followUser.bind(this)}>{`${this.state.following === 1 ? "Following" : "Follow"}`}</button></div>
                </div>
            </div>
        );
    }
}

export default User;
