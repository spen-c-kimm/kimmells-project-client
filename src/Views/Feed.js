import React, { Component } from "react";
import { Link } from "react-router-dom";
import { showFailureAlert, showLoadingAlert, showPostAlert } from "../utilities";
import { withRouter } from "../withRouter";
import Post from "./Post";

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    async componentDidMount() {
        const res = await showLoadingAlert("getFeed", {}, true);

        if (!res.authenticated) {
            this.props.navigate('/');
        }

        const srvData = res?.data;

        if (!srvData || !srvData.success) {
            await showFailureAlert(srvData?.message)
        } else {
            this.setState({
                posts: srvData.posts
            });
        }
    }

    render() {
        return (
            <div>
                <div>
                    <input placeholder="Search" />
                </div>
                <div>
                    {this.state.posts.map(p => {
                        return <Post obj={p}/>
                    })}
                </div>
                <div>
                    <button onClick={showPostAlert}>Post</button>
                    <Link to={"/profile"}><button>Profile</button></Link>
                </div>
            </div>
        );
    }
}

export default withRouter(Feed);
