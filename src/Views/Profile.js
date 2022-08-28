import React, { Component } from "react";
import { Link } from "react-router-dom";
import { showLoadingAlert, showFailureAlert } from "../utilities";
import { withRouter } from "../withHooks";
import Post from "./Post";
import Footer from "./Footer";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            user: {
                userName: "",
                fullName: "",
                bio: "",
            }
        };
    }

    async componentDidMount() {
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

    render() {
        return (
            <div>
                <div>
                    <input placeholder="Search" />
                </div>
                <div>
                    <img />
                    <h3>{this.state.user.fullName}</h3>
                    <p>@{this.state.user.userName}</p>
                    <p>{this.state.user.bio}</p>
                </div>
                <div>
                    {this.state.posts.map(p => {
                        return <Post obj={p} />
                    })}
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(Profile);
