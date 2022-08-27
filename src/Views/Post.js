import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { showFailureAlert, showLoadingAlert, showPostAlert } from "../utilities";
import { withRouter } from "../withRouter";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <div>
                    <img></img>
                    <p><strong>{this.props.obj.fullName}</strong> @{this.props.obj.userName}</p>
                </div>
                <div>
                    <p>{this.props.obj.text}</p>
                </div>
                <div>
                    <a>Reply</a>                
                    <a>Like</a>                
                </div>
            </div>
        );
    }
}

export default withRouter(Post);
