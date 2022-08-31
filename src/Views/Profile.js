import React, { Component } from "react";
import { showLoadingAlert, showFailureAlert, showBioAlert, showDeleteProfileAlert, showSuccessAlert } from "../utilities";
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
            following: [],
            selectedBtn: "posts",
            followersCount: 0,
            followingCount: 0,
            user: {
                userName: "",
                fullName: "",
                bio: "",
            }
        };
    }

    async handleBio() {
        const bio = await showBioAlert();
        this.setState({ user: { ...this.state.user, bio } });
    }

    async getPosts(uID = null) {
        const userID = uID || this.props.params?.userID;
        const followerID = localStorage.getItem("userID");
        const res = await showLoadingAlert("getUserPosts", { userID, followerID }, true);
        const srvData = res?.data;

        if (!srvData || !srvData.success) {
            await showFailureAlert(srvData?.message);
        } else {
            this.setState({
                posts: srvData.posts,
                user: srvData.user,
                followersCount: srvData.followersCount,
                followingCount: srvData.followingCount,
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
        const currentUser = localStorage.getItem("userID");
        const res = await showLoadingAlert("getFollowers", { userID, currentUser }, true);
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
        const currentUser = localStorage.getItem("userID");
        const res = await showLoadingAlert("getFollowing", { userID, currentUser }, true);
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
        let isFollowing = this.state.user.following;
        let followersCount = Number(this.state.followersCountCount);
        if (isFollowing === 0) {
            followersCount++;
            isFollowing = 1;
        } else {
            followersCount--;
            isFollowing = 0;
        }

        this.setState({ user: { ...this.state.user, following: isFollowing }, followersCount })
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
                    return <Post obj={p} initPage={this.getPosts.bind(this)} />
                })}
            </div>
        }

        if (this.state.selectedBtn === "likes") {
            return <div className="posts-container">
                {this.state.likes.map(p => {
                    return <Post obj={p} initPage={this.getPosts.bind(this)}/>
                })}
            </div>
        }

        if (this.state.selectedBtn === "followers") {
            return <div className="posts-container">
                {this.state.followers.map(f => {
                    return <User obj={f} initPage={() => {this.getPosts(f.ID)}}/>
                })}
            </div>
        }

        if (this.state.selectedBtn === "following") {
            return <div className="posts-container">
                {this.state.following.map(f => {
                    return <User obj={f} getPosts={() => {this.getPosts(f.ID)}}/>
                })}
            </div>
        }
    }

    async handleDeleteProfile() {
        const res = await showDeleteProfileAlert()
        const srvData = res?.data;

        if (srvData?.success) {
            showSuccessAlert("Profile deleted successfully.");
            this.props.navigate("/");
        } else {
            showFailureAlert(srvData?.message);
        }
    }

    render() {
        return (
            <div className="background">
                <div className="page">
                    <div className="profile-top">
                        <div>
                            <div className="banner"><img className="profile-picture" src={image} /></div>
                            <div className="padded">
                                <div className="row" style={{ alignItems: "center", justifyContent: "space-between" }}>
                                    <div className="row">
                                        <strong><p>{this.state.user.fullName}</p></strong>
                                        {this.state.user.userName ? <p>@{this.state.user.userName}</p> : <p></p>}
                                    </div>
                                    {this.props.params?.userID === localStorage.getItem("userID") ? <div className="row"><button onClick={this.handleBio.bind(this)} className="followBtn">Update Bio</button><button className="followBtn" onClick={this.handleDeleteProfile.bind(this)}>Delete Account</button></div> : <button className={`followBtn ${this.state.user.following === 1 ? "blackBtn" : ""}`} onClick={this.followUser.bind(this)}>{`${this.state.user.following === 1 ? "Following" : "Follow"}`}</button>}
                                </div>
                                <div className="row">
                                    <p>Followers: {this.state.followersCount} Following: {this.state.followingCount}</p>
                                </div>
                                <p>{this.state.user.bio}</p>
                            </div>
                        </div>
                        <div className="centered">
                            <button name="posts" onClick={(e) => { this.handleBtns(e) }} className={`${this.state.selectedBtn === "posts" ? "blackBtn" : ""}`}>Posts</button>
                            <button name="likes" onClick={(e) => { this.handleBtns(e) }} className={`${this.state.selectedBtn === "likes" ? "blackBtn" : ""}`}>Likes</button>
                            <button name="followers" onClick={(e) => { this.handleBtns(e) }} className={`${this.state.selectedBtn === "followers" ? "blackBtn" : ""}`}>Followers</button>
                            <button name="following" onClick={(e) => { this.handleBtns(e) }} className={`${this.state.selectedBtn === "following" ? "blackBtn" : ""}`}>Following</button>
                        </div>
                    </div>
                    {this.displayContent()}
                </div>
                <Footer selectedBtn="profile" userID={this.props.params?.userID} initPage={this.getPosts.bind(this)} />
            </div>
        );
    }
}

export default withRouter(Profile);
