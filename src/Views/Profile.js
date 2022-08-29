import React, { Component } from "react";
import { Link } from "react-router-dom";
import { showLoadingAlert, showFailureAlert } from "../utilities";
import { withRouter } from "../withHooks";
import Post from "./Post";
import Footer from "./Footer";
const image = require("../assets/default-profile-picture.PNG")

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            likes: [],
            user: {
                userName: "",
                fullName: "",
                bio: "",
                selectedBtn: ""
            }
        };
    }

    async getPosts() {
        const userID = this.props.params?.userID;
        const res = await showLoadingAlert("getUserPosts", { userID }, true);
        const srvData = res?.data;

        if (!srvData || !srvData.success) {
            await showFailureAlert(srvData?.message);
        } else {
            this.setState({
                posts: srvData.posts,
                user: srvData.user,
            });
        }
    }

    async getLikes() {
        const userID = this.props.params?.userID;
        const res = await showLoadingAlert("getUserLikes", { userID }, true);
        const srvData = res?.data;

        if (!srvData || !srvData.success) {
            await showFailureAlert(srvData?.message);
        } else {
            this.setState({
                likes: srvData.likes,
            });
        }
    }

    async handleBtns(e) {
        const name = e.target.name;

        if (this.state.selectedBtn === name) return;
        if (name === "posts") await this.getPosts();
        if (name === "likes") await this.getLikes();
        this.setState({ selectedBtn: name });
    }

    async componentDidMount() {
        await this.getPosts()
        this.setState({ selectedBtn: "posts" });
    }

    render() {
        return (
            <div className="background">
                <div className="page">
                    <div className="profile-top">
                        <div>
                            <div className="banner"><img className="profile-picture" src={image} /></div>
                            <div className="row">
                                <strong><p>{this.state.user.fullName}</p></strong>
                                <p>@{this.state.user.userName}</p>
                            </div>
                            <p>{this.state.user.bio}</p>
                        </div>
                        <div className="centered">
                            <button name="posts" onClick={(e) => { this.handleBtns(e) }} className={`${this.state.selectedBtn === "posts" ? "blackBtn" : ""}`}>Posts</button>
                            <button name="likes" onClick={(e) => { this.handleBtns(e) }} className={`${this.state.selectedBtn === "likes" ? "blackBtn" : ""}`}>Likes</button>
                        </div>
                    </div>
                    {this.state.selectedBtn === "posts" ? <div className="posts-container">
                        {this.state.posts.map(p => {
                            return <Post obj={p} />
                        })}
                    </div> :
                        <div className="posts-container">
                            {this.state.likes.map(p => {
                                return <Post obj={p} />
                            })}
                        </div>}
                    <Footer selectedBtn="profile" userID={this.props.params?.userID} />
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);
