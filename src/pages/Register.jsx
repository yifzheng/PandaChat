/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Add from "../images/addPhoto.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
    const [ err, setErr ] = useState( false )
    const handleSubmit = async ( e ) => {
        e.preventDefault();
        // destructure the event target data into set variables
        const displayName = e.target[ 0 ].value;
        const email = e.target[ 1 ].value;
        const password = e.target[ 2 ].value;
        const file = e.target[ 3 ].files[ 0 ];

        try {
            // create user with email and password
            const response = await createUserWithEmailAndPassword( auth, email, password )
            const storageRef = ref( storage, displayName );

            const uploadTask = uploadBytesResumable( storageRef, file );

            uploadTask.on( 
                ( error ) => {
                    setErr( true )
                },
                () => {
                    getDownloadURL( uploadTask.snapshot.ref ).then( async ( downloadURL ) => {
                        // update user profile with displayName and imaeURl
                        await updateProfile( response.user, {
                            displayName,
                            photoUrl: downloadURL,
                        } )
                        // create user object and store in database
                        await setDoc( doc( db, "users", response.user.uid ), {
                            uid: response.user.uid,
                            displayName,
                            email,
                            photoUrl: downloadURL,
                        } )
                    } );
                }
            );

        } catch ( error ) {
            setErr( true )
        }

    }
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Panda Chat</span>
                <span className="title"> Register</span>
                <form onSubmit={ handleSubmit }>
                    <input type="text" name="user-name" id="user-name" placeholder="User Name" />
                    <input type="email" name="user-email" id="user-email" placeholder="Email" />
                    <input type="password" name="user-password" id="user-password" placeholder="Password" />
                    <input type="file" style={ { display: "none" } } id="file" />
                    <label htmlFor="file">
                        <img src={ Add } alt="choose_file" />
                        <span>Add Avatar</span>
                    </label>
                    <button>Sign Up</button>
                    { err && <span className="form-error">Something went wrong</span> }
                </form>
                <p>Have an account? Login</p>
            </div>
        </div>
    )
}

export default Register