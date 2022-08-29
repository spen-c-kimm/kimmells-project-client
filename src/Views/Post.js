import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { showReplyAlert } from "../utilities";
const profile = require("../assets/default-profile-picture.PNG");
const like = require("../assets/like-icon.png");
const liked = require("../assets/liked-icon.png");
const reply = require("../assets/reply-icon.png");
const replies = require("../assets/replies-icon.png");

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: props.obj.liked === 1
        };
    }

    async handleReplyBTn() {
        await showReplyAlert(this.props.obj.userName, this.props.obj.postID);
    }

    async likePost() {
        const liked = this.state.liked;
        this.setState({ liked: !liked });
        const postID = this.props.obj.postID;
        await api("likePost", { userID: localStorage.getItem("userID"), postID }, true);
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
                    <Link to={{ pathname: `/replies/${this.props.obj.postID}` }}><img src={ replies } className="likeBtn"/></Link>
                    <img src={ reply } className="likeBtn" onClick={ this.handleReplyBTn.bind(this) }/>
                    <img src={ this.state.liked ? liked : like } className="likeBtn" onClick={this.likePost.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default Post;
