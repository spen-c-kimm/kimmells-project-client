import React, { Component } from "react";
import { Link } from "react-router-dom";
const image = require("../assets/default-profile-picture.PNG")
import api from "../api";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        console.log("this.props.obj: ", this.props.obj)
    }

    async likePost(postID) {
        const res = await api("likePost", { userID: localStorage.getItem("userID"), postID }, true);
        console.log("res: ", res);
    }

    render() {
        return (
            <div className="post">
                <div className="row post-banner">
                    <img className="post-profile-picture" src={image}/>
                    {this.props.obj.useLinks ?
                        <Link to={{ pathname: `/profile/${this.props.obj.userID}` }}><p><strong>{this.props.obj.fullName}</strong> @{this.props.obj.userName}</p></Link>
                        : <p><strong>{this.props.obj.fullName}</strong> @{this.props.obj.userName}</p>
                    }

                </div>
                <div className="post-text">
                    <p>{this.props.obj.text}</p>
                </div>
                <div className="post-actions">
                    <a>Replies</a>
                    <a>Reply</a>
                    <a>Like</a>
                </div>
            </div>
        );
    }
}

export default Post;
