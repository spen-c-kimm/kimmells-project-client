import React, { Component } from "react";
import { Link } from "react-router-dom";
import { showLoadingAlert, showFailureAlert } from "../utilities";
import { withRouter } from "../withHooks";
import Post from "./Post";
import Footer from "./Footer";
const image = require("../assets/default-profile-picture.PNG")

class Replies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            replies: []
        };
    }

    async componentDidMount() {
        const postID = this.props.params?.postID;

        const res = await showLoadingAlert("getReplies", { postID, userID: localStorage.getItem("userID") }, true);
        const srvData = res?.data;
        console.log("srvData: ", srvData)

        if (!srvData?.success) {
            await showFailureAlert(srvData?.message);
        } else {
            console.log("SETTIOT HTIE SSTATE")
            this.setState({
                post: srvData.post,
                replies: srvData.replies
            });
        }

    }

    render() {
        return (
            <div className="background">
                <div className="page">
                    <div className="profile-top">
                        <div>
                            <div className="banner"><img className="profile-picture" src={image} /></div>
                            <div className="row">
                                <p>{this.state.post.fullName} @{this.state.post.userName}</p>
                            </div>
                            <div>
                                <p>{this.state.post.text}</p>
                            </div>
                        </div>
                    </div>
                    <div className="posts-container">
                        {this.state.replies.map(r => {
                            return <Post obj={r} />
                        })}
                    </div>
                    <Footer selectedBtn="profile" userID={this.props.params?.userID} />
                </div>
            </div>
        );
    }
}

export default withRouter(Replies);
