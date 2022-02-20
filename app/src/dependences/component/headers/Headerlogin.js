import React from 'react'
import { useNavigate } from 'react-router';
import './header.css'

export default function Headerlogin() {
  const navigate = useNavigate();
 
  const signupRedirect = () =>{
    navigate('/signup')
  }
  const homeRedirect = () =>{
    navigate('/')
  }
  return (
    <header className="header-login">
      <div className="header-home-button home-button btn" onClick ={homeRedirect}>Home</div>
      <div className = "header-signup-button signup-button btn" onClick ={signupRedirect}>Sign up</div>
    </header>
  )
}
