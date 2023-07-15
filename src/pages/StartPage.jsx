import React from 'react'
import { useNavigate } from 'react-router-dom'

function StartPage () {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate( '/login' )
  }
  return (
    <div className='startContainer'>
      <img src='/panda_chat.png' alt="" />
      <button onClick={ handleClick }>Continue</button>
    </div>
  )
}

export default StartPage