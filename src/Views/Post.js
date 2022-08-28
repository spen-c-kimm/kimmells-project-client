import React, { Component } from "react";
import { Link } from "react-router-dom";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        console.log("this.props.obj: ", this.props.obj)
    }

    render() {
        return (
            <div>
                <div>
                    <img></img>
                    {this.props.obj.useLinks ?
                        <Link to={{ pathname: `/profile/${this.props.obj.userID}` }}><p><strong>{this.props.obj.fullName}</strong> @{this.props.obj.userName}</p></Link>
                        : <p><strong>{this.props.obj.fullName}</strong> @{this.props.obj.userName}</p>
                    }

                </div>
                <div>
                    <p>{this.props.obj.text}</p>
                </div>
                <div>
                    <a>Replies</a>
                    <a>Reply</a>
                    <a>Like</a>
                </div>
            </div>
        );
    }
}

export default Post;
