import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./style.scss"
import { AuthContextProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
  <AuthContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContextProvider>,
)
