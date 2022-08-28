import React, { Component } from "react";
import { Link } from "react-router-dom";
import { showPostAlert } from "../utilities";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    logout() {
        localStorage.clear();
    }

    render() {
        return (
            <div className="footer">
                <Link className="fifth" to={"/feed"}><button>Feed</button></Link>
                <Link className="fifth" to={{ pathname: `/profile/${localStorage.getItem("userID")}` }}><button>Profile</button></Link>
                <button className="fifth" onClick={showPostAlert}>Post</button>
                <Link className="fifth" to={"/"}><button onClick={this.logout}>Log out</button></Link>
            </div>
        );
    }
}

export default Footer;
