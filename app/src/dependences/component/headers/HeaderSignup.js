import React from 'react'
import { useNavigate } from 'react-router';
import'./header.css'

export default function HeaderSignup() {
    const navigate = useNavigate();
 
    const loginRedirect = () =>{
      navigate('/login')
    }
    const homeRedirect = () =>{
      navigate('/')
    }
    return (
      <header className="header-signup">
        <div className="header-home-button home-button btn " onClick ={homeRedirect}>Home</div>
        <div className = "header-login-button login-button btn " onClick ={loginRedirect}>Log in</div>
      </header>
    )
}
