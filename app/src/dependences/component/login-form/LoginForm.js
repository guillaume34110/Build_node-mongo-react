import React, { useRef } from 'react'
import { useNavigate } from 'react-router';
import { location } from '../../utilities/location'
import { lettersAndNumbers, lettersRegex } from '../../utilities/regex'
import './login-form.css'

export default function LoginForm({stateDatas,setStateDatas}) {

  const navigate = useNavigate();

  const userNameRef = useRef();
  const passwordRef = useRef();
  const passwordLabelSpan = useRef();
  const nameLabelSpan = useRef();

  const login = async () => {

    let token = 0
    const userName = userNameRef.current.value
    const passwordValue = passwordRef.current.value

    if (lettersRegex.test(userName)) token++
    if (lettersAndNumbers.test(passwordValue)) token++
    if (token === 2) {

      const newData = {
        username: userName,
        password: passwordValue
      }

      try {
        const response = await fetch(location + '/login', {
          method: 'POST', // or 'PUT'
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(newData),
        })

        let newJwtToken = await response.json()
        let dataBuffer = stateDatas
      dataBuffer.jwtToken = newJwtToken.accessToken
      await setStateDatas(dataBuffer)
        navigate("/loby");
       
      
      }
      catch {
        const label = nameLabelSpan.current
        label.innerText = 'wrong user or password'
      }

    } else console.log(false)


  }


  return (
    <section className="login-section">
      <div className="login-card">
        <div className="login-title">
          <h1>Log in</h1>
        </div>

        <div className="login-inputs">
          <div className="login-input">
            <label htmlFor="username">User name <span ref={nameLabelSpan}></span> </label>
            <input type="text" id="username" name="username" placeholder="Username" ref={userNameRef} />
          </div>
          <div className="login-input">
            <label htmlFor=" password">Password <span ref={passwordLabelSpan}></span></label>
            <input type="password" id="password" name="password" ref={passwordRef} />
          </div>
        </div>
        <div className="login-button login-main-button  btn" onClick={login}>Log in</div>
      </div>

    </section>
  )
}
