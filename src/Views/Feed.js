import React, { Component } from "react";
import { showFailureAlert, showLoadingAlert } from "../utilities";
import { withRouter } from "../withHooks";
import Post from "./Post";
import User from "./User";
import Footer from "./Footer";

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            users: [],
            selectedBtn: "posts"
        };
    }

    async initPage() {
        const userID = localStorage.getItem("userID");
        const res = await showLoadingAlert("getFeed", { userID }, true);

        if (!res.authenticated) {
            this.props.navigate('/');
        } else {
            const srvData = res?.data;

            if (!srvData || !srvData.success) {
                await showFailureAlert(srvData?.message)
            } else {
                this.setState({
                    posts: srvData.posts,
                    users: srvData.users,
                });
            }
        }
    }

    async componentDidMount() {
        this.initPage();
    };

    handleBtns(e) {
        this.setState({
            selectedBtn: e.target.name
        });
    };

    render() {
        return (
            <div className="background">
                <div className="page">
                    <div className="feed-top">
                        <input className="search" placeholder="Search" />
                        <div className="centered">
                            <button name="posts" onClick={(e) => { this.handleBtns(e) }} className={`${this.state.selectedBtn === "posts" ? "blackBtn" : ""}`}>Posts</button>
                            <button name="users" onClick={(e) => { this.handleBtns(e) }} className={`${this.state.selectedBtn === "users" ? "blackBtn" : ""}`}>Users</button>
                        </div>
                    </div>
                    {this.state.selectedBtn === "posts" ? <div className="feed-container">
                        {this.state.posts.map(p => {
                            return <Post obj={{ ...p, useLinks: true }} />
                        })}
                    </div> :
                        <div className="feed-container">
                            {this.state.users.map(u => {
                                return <User obj={u} />
                            })}
                        </div>
                    }
                    <Footer selectedBtn="feed" initPage={this.initPage.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default withRouter(Feed);
