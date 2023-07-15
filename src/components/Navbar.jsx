import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="logoContainer">
        <img src="/panda_logo.png" />
        <span className='logo'>Panda Chat</span>
      </div>

      <div className="user">
        <img src="https://cdn.pixabay.com/photo/2021/04/17/19/41/dog-6186679_640.jpg" alt="" />
        <span>John Doe</span>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default Navbar