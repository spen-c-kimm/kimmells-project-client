import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "WELCOME!!!"
        };
    }

    componentWillMount() {
        console.log("TEST")
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Title</h1>
                    <input />
                    <input />
                    <button>Log In</button>
                </div>
                <div>
                    <p>Don't have an account? <Link to={"/signup"}><span>Sign up</span></Link></p>
                </div>
            </div>
        );
    }
}

export default Home;
