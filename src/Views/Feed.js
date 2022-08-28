import React, { Component } from "react";
import { Link } from "react-router-dom";
import { showFailureAlert, showLoadingAlert, showPostAlert } from "../utilities";
import { withRouter } from "../withHooks";
import Post from "./Post";
import Footer from "./Footer";

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            users: []
        };
    }

    async componentDidMount() {
        const res = await showLoadingAlert("getFeed", {}, true);

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

    render() {
        return (
            <div>
                <div>
                    <input placeholder="Search" />
                </div>
                <div>
                    <button>Posts</button>
                    <button>Users</button>
                </div>
                <div>
                    {this.state.posts.map(p => {
                        return <Post obj={{...p, useLinks: true}} />
                    })}
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(Feed);
