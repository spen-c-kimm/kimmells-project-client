import React, { Component } from "react";
import { Link } from "react-router-dom";
import { showPostAlert } from "../utilities";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    logout() {
        localStorage.clear();
    }

    render() {
        return (
            <div>
                <Link to={"/feed"}><button>Feed</button></Link>
                <Link to={{ pathname: `/profile/${localStorage.getItem("userID")}` }}><button>Profile</button></Link>
                <button onClick={showPostAlert}>Post</button>
                <Link to={"/"}><button onClick={this.logout}>Log out</button></Link>
            </div>
        );
    }
}

export default Footer;
