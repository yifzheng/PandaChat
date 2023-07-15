import React from 'react'
import Send from '../images/send.png'
import Add from "../images/addPhoto.png"

const Input = () => {
  return (
    <div className='input'>
      <input type='text' placeholder='Send a message...' />
      <div className="send">
        <input type="button" style={ { display: 'none' } } id='addImage' />
        <label htmlFor='addImage'>
          <img src={ Add } alt="" />
        </label>
        <input type="button" style={ { display: 'none' } } id='sendBtn' />
        <label htmlFor='sendBtn'>
          <img src={ Send } alt="" />
        </label>
      </div>
    </div>
  )
}

export default Input