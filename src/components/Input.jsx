import React, { useContext, useState } from 'react'
import Send from '../images/send.png'
import Add from "../images/addPhoto.png"
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { v4 as uuid } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const Input = () => {
  const [ text, setText ] = useState( "" )
  const [ image, setImage ] = useState( null )

  const { currentUser } = useContext( AuthContext )
  const { data } = useContext( ChatContext )

  // check if user pressed "ENTER" key
  const handleKey = ( e ) => {
    e.code === "Enter" && handleSend()
  }
  // send message
  const handleSend = async () => {
    if ( image ) {
      const storageRef = ref( storage, uuid() ); // get storage reference and set file filename to be user display name
      const uploadTask = uploadBytesResumable( storageRef, image ); // create an upload task

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
          console.log( error )
        },
        // onsuccess get the downloadable url of the image and update user
        () => {
          getDownloadURL( uploadTask.snapshot.ref ).then( async ( downloadURL ) => {
            // update user profile with displayName and imaeURl
            await updateDoc( doc( db, "chats", data.chatId ), {
              messages: arrayUnion( {
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                image: downloadURL
              } )
            } )
          } );
        }
      );
    }
    else {
      await updateDoc( doc( db, "chats", data.chatId ), {
        messages: arrayUnion( {
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        } )
      } )
    }

    // update latest text for both users
    await updateDoc( doc( db, "userChats", currentUser.uid ), {
      [ data.chatId + ".lastMessage" ]: {
        text
      },
      [ data.chatId + ".date" ]: serverTimestamp()
    } )
    await updateDoc( doc( db, "userChats", data.user.uid ), {
      [ data.chatId + ".lastMessage" ]: {
        text
      },
      [ data.chatId + ".date" ]: serverTimestamp()
    } )

    setImage( null )
    setText( "" )
  }

  return (
    <div className='input'>
      <input type='text' placeholder='Send a message...' onChange={ e => setText( e.target.value ) } value={ text } onKeyDown={ handleKey } />
      <div className="send">
        <input type="file" style={ { display: 'none' } } id='addImage' onChange={ e => setImage( e.target.files[ 0 ] ) } />
        <label htmlFor='addImage'>
          <img src={ Add } alt="" />
        </label>
        <input type="button" style={ { display: 'none' } } id='sendBtn' />
        <label htmlFor='sendBtn'>
          <img src={ Send } alt="" onClick={ handleSend } />
        </label>
      </div>
    </div>
  )
}

export default Input