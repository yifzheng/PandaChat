/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Panda Chat</span>
                <span className="title"> Login</span>
                <form>
                    <input type="email" name="user-email" id="user-email" placeholder="Email" />
                    <input type="password" name="user-password" id="user-password" placeholder="Password" />
                    <button>Sign In</button>
                </form>
                <p>Don&apost have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}

export default Login