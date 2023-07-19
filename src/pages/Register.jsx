/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Add from "../images/addPhoto.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [ err, setErr ] = useState( false );
    const navigate = useNavigate();
    // submit the form to create a user account and user object
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
            const userUID = response.user.uid;

            const storageRef = ref( storage, userUID ); // get storage reference and set file filename to be user display name
            const uploadTask = uploadBytesResumable( storageRef, file ); // create an upload task

            // upload the file into storage
            uploadTask.on( 'state_changed', ( snapshot ) => {
                const progress = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
                console.log( 'Upload is ' + progress + '% done' );
                switch ( snapshot.state ) {
                    case 'paused':
                        console.log( 'Upload is paused' );
                        break;
                    case 'running':
                        console.log( 'Upload is running' );
                        break;
                }
            },
                ( error ) => {
                    setErr( true )
                    console.log( error )
                },
                // onsuccess get the downloadable url of the image and update user
                () => {
                    getDownloadURL( uploadTask.snapshot.ref ).then( async ( downloadURL ) => {
                        // update user profile with displayName and imaeURl
                        await updateProfile( auth.currentUser, {
                            displayName,
                            photoURL: downloadURL,
                        } )
                        
                        // create user object and store in database
                        await setDoc( doc( db, "users", userUID ), {
                            uid: userUID,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        } )
                        // create userChats collection to store all the available chats for current user
                        await setDoc( doc( db, "userChats", userUID ), {} )
                        // once done, navigate to login page to login
                        navigate( '/home' ) // navigate to home page
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
                <p>Have an account? <Link to="/login">Login</Link></p>
            </div>
            <footer>&copy; YifZheng Studio</footer>
        </div>
    )
}

export default Register