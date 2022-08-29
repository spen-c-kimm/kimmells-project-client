import React, { Component } from "react";
import { showLoadingAlert, showFailureAlert, showBioAlert } from "../utilities";
import { withRouter } from "../withHooks";
import Post from "./Post";
import User from "./User";
import Footer from "./Footer";
import api from "../api";
const image = require("../assets/default-profile-picture.PNG")

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            likes: [],
            followers: [],
            follwing: [],
            selectedBtn: "posts",
            user: {
                userName: "",
                fullName: "",
                bio: "",
                following: 0
            }
        };
    }

    async handleBio() {
        const bio = await showBioAlert();
        this.setState({ user: {...this.state.user, bio} });
    }

    async getPosts() {
        const userID = this.props.params?.userID;
        const followerID = localStorage.getItem("userID");
        const res = await showLoadingAlert("getUserPosts", { userID, followerID }, true);
        const srvData = res?.data;

        if (!srvData || !srvData.success) {
            await showFailureAlert(srvData?.message);
        } else {
            this.setState({
                posts: srvData.posts,
                user: srvData.user,
                selectedBtn: "posts"
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

    async getFollowers() {
        const userID = this.props.params?.userID;
        const res = await showLoadingAlert("getFollowers", { userID }, true);
        const srvData = res?.data;

        if (!srvData || !srvData.success) {
            await showFailureAlert(srvData?.message);
        } else {
            this.setState({
                followers: srvData.followers,
            });
        }
    }

    async getFollowing() {
        const userID = this.props.params?.userID;
        const res = await showLoadingAlert("getFollowing", { userID }, true);
        const srvData = res?.data;

        if (!srvData || !srvData.success) {
            await showFailureAlert(srvData?.message);
        } else {
            this.setState({
                following: srvData.following,
            });
        }
    }

    async followUser() {
        let following = this.state.user.following;
        following = following === 0 ? 1 : 0;
        this.setState({ user: { ...this.state.user, following } })
        const followerID = localStorage.getItem("userID");
        const followingID = this.state.user.ID;

        await api("followUser", { followerID, followingID }, true);
    }

    async handleBtns(e) {
        const name = e.target.name;

        if (this.state.selectedBtn === name) return;
        if (name === "posts") await this.getPosts();
        if (name === "likes") await this.getLikes();
        if (name === "followers") await this.getFollowers();
        if (name === "following") await this.getFollowing();
        this.setState({ selectedBtn: name });
    }

    async componentDidMount() {
        await this.getPosts();        
    }

    displayContent() {
        if (this.state.selectedBtn === "posts") {
            return <div className="posts-container">
                {this.state.posts.map(p => {
                    return <Post obj={p} />
                })}
            </div>
        }

        if (this.state.selectedBtn === "likes") {
            return <div className="posts-container">
                {this.state.likes.map(p => {
                    return <Post obj={p} />
                })}
            </div>
        }

        if (this.state.selectedBtn === "followers") {
            return <div className="posts-container">
                {this.state.followers.map(f => {
                    return <User obj={f} />
                })}
            </div>
        }

        if (this.state.selectedBtn === "following") {
            return <div className="posts-container">
                {this.state.following.map(f => {
                    return <User obj={f} />
                })}
            </div>
        }
    }

    render() {
        return (
            <div className="background">
                <div className="page">
                    <div className="profile-top">
                        <div>
                            <div className="banner"><img className="profile-picture" src={image} /></div>
                            <div className="row" style={{ alignItems: "center" }}>
                                <div className="row" style={{ width: "85%" }}>
                                    <strong><p>{this.state.user.fullName}</p></strong>
                                    <p>@{this.state.user.userName}</p>
                                </div>
                                {this.props.params?.userID === localStorage.getItem("userID") ? <button onClick={this.handleBio.bind(this)}>Update Bio</button> : <button style={{ width: "10%" }} className={`followBtn ${this.state.user.following === 1 ? "blackBtn" : ""}`} onClick={this.followUser.bind(this)}>Follow</button>}
                            </div>
                            <p>{this.state.user.bio}</p>
                        </div>
                        <div className="centered">
                            <button name="posts" onClick={(e) => { this.handleBtns(e) }} className={`${this.state.selectedBtn === "posts" ? "blackBtn" : ""}`}>Posts</button>
                            <button name="likes" onClick={(e) => { this.handleBtns(e) }} className={`${this.state.selectedBtn === "likes" ? "blackBtn" : ""}`}>Likes</button>
                            <button name="followers" onClick={(e) => { this.handleBtns(e) }} className={`${this.state.selectedBtn === "followers" ? "blackBtn" : ""}`}>Followers</button>
                            <button name="following" onClick={(e) => { this.handleBtns(e) }} className={`${this.state.selectedBtn === "following" ? "blackBtn" : ""}`}>Following</button>
                        </div>
                    </div>
                    {this.displayContent()}
                    <Footer selectedBtn="profile" userID={this.props.params?.userID} initPage={this.getPosts.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);
