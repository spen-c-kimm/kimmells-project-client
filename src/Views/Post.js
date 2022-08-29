import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../api";
const profile = require("../assets/default-profile-picture.PNG");
const like = require("../assets/like-icon.png");
const liked = require("../assets/liked-icon.png");

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: props.obj.liked === 1
        };
    }

    // componentDidMount() {
    //     console.log("this.props.obj: ", this.props.obj)
    //     console.log("this.state.liked: ", this.state.liked)
    // }

    async likePost() {
        const liked = this.state.liked;
        this.setState({ liked: !liked });
        const postID = this.props.obj.postID;
        const res = await api("likePost", { userID: localStorage.getItem("userID"), postID }, true);
        console.log("res: ", res);
    }

    render() {
        return (
            <div className="post">
                <div className="row post-banner">
                    <img className="post-profile-picture" src={profile}/>
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
                    <img src={ this.state.liked ? liked : like } className="likeBtn" onClick={this.likePost.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default Post;
