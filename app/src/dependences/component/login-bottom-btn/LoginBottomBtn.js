import React from 'react'
import { useNavigate } from 'react-router';
import './login-bottom-btn.css'

export default function LoginBottomBtn() {
    const navigate = useNavigate();
    const signupRedirect = () =>{
        navigate('/signup')
      }
  return (
    <div className="login-create-accout-button create-new-account-button  btn" onClick={signupRedirect}>Create a new account</div>
  )
}
