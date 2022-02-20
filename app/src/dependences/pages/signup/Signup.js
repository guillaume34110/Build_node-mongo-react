import React from 'react'
import HeaderSignup from '../../component/headers/HeaderSignup'
import SignupForm from '../../component/signup-form/SignupForm.js'
import './signup.css'

export default function Signup() {
  
  return (
    <main className="signup-main">
       <HeaderSignup />
       <SignupForm />
      <div className="signup-main-bottom-div"></div>
    </main>
  )
}
