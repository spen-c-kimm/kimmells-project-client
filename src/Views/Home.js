import React, { Component } from "react";

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
                    <p>Don't have an account? <span>Sign up</span></p>
                </div>
            </div>
        );
    }
}

export default Home;
