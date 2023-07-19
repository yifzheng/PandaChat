/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [ err, setErr ] = useState( false );
    const navigate = useNavigate();

    // submit the form to login
    const handleSubmit = async ( e ) => {
        e.preventDefault();
        // destructure the event target data into set variables
        const email = e.target[ 0 ].value;
        const password = e.target[ 1 ].value;
         try {
            await signInWithEmailAndPassword( auth, email, password )
            navigate( '/home' )
        } catch ( error ) {
            setErr( true )
        }
    }
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Panda Chat</span>
                <span className="title"> Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="user-email" id="user-email" placeholder="Email" />
                    <input type="password" name="user-password" id="user-password" placeholder="Password" />
                    <button>Sign In</button>
                    { err && <span className="form-error">Something went wrong</span> }
                </form>
                <p>Don&#39;t have an account? <Link to="/register">Register</Link></p>
            </div>
            <footer>&copy; YifZheng Studio</footer>
        </div>
    )
}

export default Login