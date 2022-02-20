import React from 'react'
import Headerlogin from '../../component/headers/Headerlogin'
import LoginBottomBtn from '../../component/login-bottom-btn/LoginBottomBtn'
import LoginForm from '../../component/login-form/LoginForm'
import './login.css'

export default function Login({stateDatas,setStateDatas,jwtToken}) {
  return (
    <main className = "login-main" >
       <Headerlogin />
       <LoginForm stateDatas = {stateDatas} setStateDatas = {setStateDatas} />
      <LoginBottomBtn />
    </main>
  )
}
