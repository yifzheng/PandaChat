// eslint-disable-next-line no-unused-vars
import React from 'react'
import SideBar from '../components/SideBar'
import Chat from '../components/Chat'

const HomePage = () => {
  return (
    <div className='homePage'>
        <div className="homePageContainer">
            <SideBar />
            <Chat />
        </div>
        <footer>&copy; YifZheng Studio</footer>
    </div>
  )
}

export default HomePage