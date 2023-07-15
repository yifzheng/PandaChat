import React from 'react'

const Search = () => {
  return (
    <div className='searchBar'>
      <div className="searchForm">
        <input type="text" placeholder='Find a user'/>
      </div>
      <div className="userChat">
      <img src="https://cdn.pixabay.com/photo/2021/04/17/19/41/dog-6186679_640.jpg" alt="" />
        <div className="userChatInfo">
          <span>Jane Dow</span>
        </div>
      </div>
    </div>
  )
}

export default Search