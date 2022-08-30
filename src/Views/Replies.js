import React, { Component } from "react";
import { showLoadingAlert, showFailureAlert, showReplyAlert } from "../utilities";
import { withRouter } from "../withHooks";
import Post from "./Post";
import Footer from "./Footer";
import api from "../api";
const image = require("../assets/default-profile-picture.PNG")
const like = require("../assets/like-icon.png");
const liked = require("../assets/liked-icon.png");
const reply = require("../assets/reply-icon.png");

class Replies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            replies: [],
            liked: false,
        };
    }

    async initPage(postID) {

        const res = await showLoadingAlert("getReplies", { postID, userID: localStorage.getItem("userID") }, true);
        const srvData = res?.data;

        if (!srvData?.success) {
            await showFailureAlert(srvData?.message);
        } else {
            this.setState({
                post: srvData.post,
                replies: srvData.replies,
                liked: srvData.post?.liked === 1
            });
        }
    }

    async componentDidMount() {
        await this.initPage(this.props.params?.postID);
    }

    async likePost() {
        const liked = this.state.liked;
        this.setState({ liked: !liked });
        const postID = this.state.post.postID;
        await api("likePost", { userID: localStorage.getItem("userID"), postID }, true);
    }

    async handleReplyBTn() {
        await showReplyAlert(this.state.post.userName, this.state.post.postID, () => { this.initPage(this.props.params?.postID) });
    }

    render() {
        return (
            <div className="background">
                <div className="page">
                    <div className="replies-top">
                        <div>
                            <div className="banner"><img className="profile-picture" src={image} /></div>
                            <div className="replies-banner padded">
                                <div className="row">
                                    {this.state.post.userName ? <p><strong>{this.state.post.fullName}</strong> @{this.state.post.userName}</p> : <p></p>}
                                </div>
                                <div>
                                    <p>{this.state.post.text}</p>
                                </div>
                                <div className="post-actions">
                                    <img src={reply} className="likeBtn" onClick={this.handleReplyBTn.bind(this)} />
                                    <img src={this.state.liked ? liked : like} className="likeBtn" onClick={this.likePost.bind(this)} />
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="posts-container">
                        {this.state.replies?.length > 0 ? this.state.replies.map(r => {
                            return <Post obj={r} initPage={() => { this.initPage(r.postID) }} location={ this.props.location }/>
                        }) : <h2 className="noReplies">No Replies</h2>}
                    </div>
                    <Footer selectedBtn="profile" userID={this.props.params?.userID} />
                </div>
            </div>
        );
    }
}

export default withRouter(Replies);
