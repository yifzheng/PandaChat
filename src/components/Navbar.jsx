import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { currentUser } = useContext( AuthContext)
  return (
    <div className='navbar'>
      <div className="logoContainer">
        <img src="/panda_logo.png" />
        <span className='logo'>Panda Chat</span>
      </div>

      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={ () => signOut( auth ) }>Logout</button>
      </div>
    </div>
  )
}

export default Navbar