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
            selectedBtn: "posts",
            filter: ""
        };
    }

    setFilter() {
        const filter = document.getElementById("searchInput").value;
        this.setState({ filter });
    }

    handleFilter(arr) {
        const searchVal = this.state.filter.toLowerCase();

        if (this.state.selectedBtn === "posts") {
            const filtered = arr.filter(p => {
                return p.text.toLowerCase().includes(searchVal) || p.userName.toLowerCase().includes(searchVal) || p.fullName.toLowerCase().includes(searchVal);
            });

            return filtered;
        }
        if (this.state.selectedBtn === "users") {
            const filtered = arr.filter(p => {
                return p.userName.toLowerCase().includes(searchVal) || p.fullName.toLowerCase().includes(searchVal);
            });

            return filtered;
        }
    }

    async getPosts() {
        const userID = localStorage.getItem("userID");
        const res = await showLoadingAlert("getPosts", { userID }, true);

        if (!res.authenticated) {
            this.props.navigate('/');
        } else {
            const srvData = res?.data;

            if (!srvData || !srvData.success) {
                await showFailureAlert(srvData?.message)
            } else {
                this.setState({
                    posts: srvData.posts,
                    selectedBtn: "posts"
                });
            }
        }
    }

    async getUsers() {
        const userID = localStorage.getItem("userID");
        const res = await showLoadingAlert("getUsers", { userID }, true);

        if (!res.authenticated) {
            this.props.navigate('/');
        } else {
            const srvData = res?.data;

            if (!srvData || !srvData.success) {
                await showFailureAlert(srvData?.message)
            } else {
                this.setState({
                    users: srvData.users,
                    selectedBtn: "users"
                });
            }
        }
    }

    async initPage() {
        await this.getPosts();
    }

    async componentDidMount() {
        this.initPage();
    };

    async handleBtns(e) {
        if (this.state.selectedBtn === e.target.name) {
            return
        }
        if (e.target.name === "posts") {
            await this.getPosts();
        }
        if (e.target.name === "users") {
            await this.getUsers();
        }
    };

    render() {
        return (
            <div className="background">
                <div className="page">
                    <div className="feed-top">
                        <div className="row searchBar"><input id="searchInput" className="search" placeholder="Type something..." /><button className="searchBtn" onClick={this.setFilter.bind(this)}>Search</button></div>
                        <div className="centered">
                            <button name="posts" onClick={(e) => { this.handleBtns(e) }} className={`${this.state.selectedBtn === "posts" ? "blackBtn" : ""}`}>Posts</button>
                            <button name="users" onClick={(e) => { this.handleBtns(e) }} className={`${this.state.selectedBtn === "users" ? "blackBtn" : ""}`}>Users</button>
                        </div>
                    </div>
                    {this.state.selectedBtn === "posts" ? <div className="feed-container">
                        {this.handleFilter(this.state.posts).map(p => {
                            return <Post obj={{ ...p, useLinks: true }} initPage={this.initPage.bind(this)}/>
                        })}
                    </div> :
                        <div className="feed-container">
                            {this.handleFilter(this.state.users).map(u => {
                                return <User obj={u} />
                            })}
                        </div>
                    }
                </div>
                <Footer selectedBtn="feed" initPage={this.initPage.bind(this)} />
            </div>
        );
    }
}

export default withRouter(Feed);
