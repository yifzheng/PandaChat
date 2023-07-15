import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
        <span className='logo'>Panda Chat</span>
         <div className="user">
            <img src="https://cdn.pixabay.com/photo/2021/04/17/19/41/dog-6186679_640.jpg" alt=""/>
            <span>John Doe</span>
            <button>Logout</button>
         </div>
    </div>
  )
}

export default Navbar