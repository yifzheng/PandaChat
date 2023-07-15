import React from 'react'

function Message () {
    return (
        <div className='message owner'>
            <div className="messageInfo">
                <img src="https://cdn.pixabay.com/photo/2021/04/17/19/41/dog-6186679_640.jpg" alt="" />
                <span>Just Now</span>
            </div>
            <div className="messageContent">
                <p>Hello, this is some message</p>
                <img src="https://cdn.pixabay.com/photo/2021/04/17/19/41/dog-6186679_640.jpg" alt="" />
            </div>
        </div>
    )
}

export default Message