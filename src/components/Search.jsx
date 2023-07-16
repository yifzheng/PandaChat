import React, { useContext, useState } from 'react'
import { db } from '../firebase';
import { collection, getDocs, getDoc, where, query, setDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';

const Search = () => {
  const [ userName, setUserName ] = useState( "" )
  const [ user, setUser ] = useState( null )
  const [ err, setErr ] = useState( false );

  // get current user
  const { currentUser } = useContext( AuthContext )

  // function that queires the firestore database for the given username in search bar
  const handleSearch = async () => {
    // create query for user
    const q = query( collection( db, "users" ), where( "displayName", "==", userName ) )
    try {
      // retrieve the user if exist
      const querySnapShot = await getDocs( q );
      querySnapShot.forEach( ( doc ) => {
        setUser( doc.data() )
      } )
    } catch ( error ) {
      setErr( true )
    }
  }

  // check if user pressed "ENTER" key
  const handleKeyChange = ( e ) => {
    e.code === "Enter" && handleSearch()
  }

  // handle the selection of user
  const handleSelect = async () => {
    // check whether the group(chats in firestore) exist, if not create
    const combinedUID = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const response = await getDoc( doc( db, "chats", combinedUID ) ) // get the document in the chats collection with combined UID as id
      if ( !response.exists() ) { // if the document does not exist
        await setDoc( doc( db, "chats", combinedUID ), { messages: [] } ) // create empty document in collection with combinedUID as id and create an empty array to store messages

        // create user chats for current user
        await updateDoc( doc( db, "userChats", currentUser.uid ), {
          [ combinedUID + ".userInfo" ]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [ combinedUID + ".date" ]: serverTimestamp()
        } )
        // do same for the recieving user
        await updateDoc( doc( db, "userChats", user.uid ), {
          [ combinedUID + ".userInfo" ]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [ combinedUID + ".date" ]: serverTimestamp()
        } )
      }
    }
    catch ( err ) {
      setErr( true )
    }
    // once user clicks on a searche duser, make it disappear
    setUser(null);
    setUserName("")
  }

  return (
    <div className='searchBar'>
      <div className="searchForm">
        <input type="text" placeholder='Find a user' onKeyDown={ handleKeyChange } onChange={ e => setUserName( e.target.value ) } value={userName}/>
      </div>
      { err && <span className='search-error'>User not found</span> }
      { user && <div className="userChat" onClick={ handleSelect }>
        <img src={ user.photoURL } alt="" />
        <div className="userChatInfo">
          <span>{ user.displayName }</span>
        </div>
      </div> }
    </div>
  )
}

export default Search