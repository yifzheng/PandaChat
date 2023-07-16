/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

function Message ( { message } ) {
    const { currentUser } = useContext( AuthContext )
    const { data } = useContext( ChatContext )
    const chatRef = useRef();

    useEffect( () => {
        chatRef.current?.scrollIntoView( { behavior: "smooth" } )
    }, [ message ] )


    return (
        <div className={ `message ${message.senderId === currentUser.uid && "owner"}` } ref={ chatRef }>
            <div className="messageInfo">
                <img src={ message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL } alt="" />
                <span>Just Now</span>
            </div>
            <div className="messageContent">
                <p>{ message.text }</p>
                { message.image && <img src={ message.image } alt="" /> }
            </div>
        </div>
    )
}

export default Message