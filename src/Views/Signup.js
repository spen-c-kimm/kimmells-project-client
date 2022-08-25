import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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

    async createUser() {
        const res = await axios.post("http://localhost:3000/api/v1/signup");
        console.log("res: ", res)
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Title</h1>
                    <h2>Sub Title</h2>
                    <input placeholder="Full Name"/>
                    <input placeholder="Username"/>
                    <input placeholder="Password"/>
                    <input placeholder="Confirm Password"/>
                    <button onClick={this.createUser}>Sign up</button>
                </div>
                <div>
                    <p>Have an account? <Link to={"/"}><span>Log in</span></Link></p>
                </div>
            </div>
        );
    }
}

export default Home;
