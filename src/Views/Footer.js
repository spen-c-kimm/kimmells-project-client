import React, { Component } from "react";
import { Link } from "react-router-dom";
import { showPostAlert } from "../utilities";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBtn: ""
        };
    }

    componentDidMount() {
        if (this.props.selectedBtn === "feed") this.setState({ selectedBtn: "feed" });
        if (this.props.selectedBtn === "profile" && this.props.userID === localStorage.getItem("userID")) this.setState({ selectedBtn: "profile" });
    }

    logout() {
        localStorage.clear();
    }

    render() {
        return (
            <div className="footer">
                <Link className="fifth" to={"/feed"}><button className={`${this.state.selectedBtn === "feed" ? "blackBtn" : ""}`}>Feed</button></Link>
                <Link className="fifth" to={{ pathname: `/profile/${localStorage.getItem("userID")}` }}><button className={`${this.state.selectedBtn === "profile" ? "blackBtn" : ""}`} >Profile</button></Link>
                <button className="fifth" onClick={showPostAlert}>Post</button>
                <Link className="fifth" to={"/"}><button onClick={this.logout}>Log out</button></Link>
            </div>
        );
    }
}

export default Footer;
