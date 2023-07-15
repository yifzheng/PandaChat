import React, { useEffect } from 'react'
import { useRef } from 'react';
import Message from './Message'

const Messages = () => {
  const chatRef = useRef();

  useEffect( () => {
    // Scroll to the bottom when component mounts or whenever the content updates
    scrollToBottom();

    // cleanup
    return () => { }
  }, [] );

  const scrollToBottom = () => {
    if ( chatRef.current ) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  return (
    <div className='messages' ref={ chatRef }>
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  )
}

export default Messages