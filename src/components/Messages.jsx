import React, { useContext, useEffect, useState } from 'react'
import { useRef } from 'react';
import Message from './Message'
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Messages = () => {
  const [ messages, setMessages ] = useState( [] )
  const { data } = useContext( ChatContext )


  useEffect( () => {
    // Scroll to the bottom when component mounts or whenever the content updates
    const unSub = onSnapshot( doc( db, "chats", data.chatId ), ( doc ) => {
      doc.exists() && setMessages( doc.data().messages )
    } )
    // cleanup
    return () => {
      unSub()
    }
  }, [ data.chatId ] );

  return (
    <div className='messages'>
      { messages?.map( ( m ) => (
        <Message message={ m } key={ m.id } />
      ) ) }
    </div>
  )
}

export default Messages