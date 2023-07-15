/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import StartPage from './pages/StartPage'
import HomePage from './pages/homepage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'

function App () {

  const { currentUser } = useContext( AuthContext )
  console.log( currentUser )
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={ <StartPage /> } />
          <Route path='login' element={ <Login /> } />
          <Route path='register' element={ <Register /> } />
          <Route path='home' element={ currentUser ? <HomePage /> : <Login /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
