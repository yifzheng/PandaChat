/* eslint-disable no-unused-vars */
import React from "react";
import Add from "../images/addPhoto.png"


const Register = () => {
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Panda Chat</span>
                <span className="title"> Register</span>
                <form>
                    <input type="text" name="user-name" id="user-name" placeholder="User Name" />
                    <input type="email" name="user-email" id="user-email" placeholder="Email" />
                    <input type="password" name="user-password" id="user-password" placeholder="Password" />
                    <input type="file" style={ { display: "none" } } id="file" />
                    <label htmlFor="file">
                        <img src={Add} alt="choose_file" />
                        <span>Add Avatar</span>
                    </label>
                    <button>Sign Up</button>
                </form>
                <p>Have an account? Login</p>
            </div>
        </div>
    )
}

export default Register