import { location } from "../../utilities/location.js";
import React, { useRef } from "react";
import { sha256 } from "../../utilities/createSha256.js";
import { lettersAndNumbers, lettersRegex } from "../../utilities/regex.js";
import "./signup-form.css";
import { useNavigate } from "react-router";

export default function SignupForm() {
  const navigate = useNavigate();
 
  const userNameRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const confirmLabelSpan = useRef();
  const nameLabelSpan = useRef();

  const signUp = async () => {
    let token = 0;
    const userName = userNameRef.current.value;
    const passwordValue = passwordRef.current.value;
    const passwordConfirmValue = confirmRef.current.value;

    if (lettersRegex.test(userName)) token++;
    if (lettersAndNumbers.test(passwordValue)) token++;
    if (passwordValue === passwordConfirmValue) token++;
    else confirmLabelSpan.current.innerText = "password don't match";
    if (token === 3) {
      let hashedPassword = await sha256(passwordValue);

      let newData = {
        username: userName,
        password: hashedPassword,
      };
      newData = JSON.stringify(newData)
      console.log(newData)
      try {
        let response = await fetch(location + "/signup", {
          method: "POST", // or 'PUT'
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
          },
          body: newData ,
        });
        response = await response.json();

        if (response !== "user already exist") navigate('/login')
        else nameLabelSpan.current.innerText = newData;
      } catch {
        console.error("Error:", false);
      }
    } else console.log(false);
  };

  return (
    <section className="signup-section">
      <div className="signup-card">
        <div className="signup-title">
          <h1>Sign up</h1>
        </div>

        <div className="signup-inputs">
          <div className="signup-input">
            <label htmlFor="username">
              User name <span ref={nameLabelSpan}></span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="User name"
              ref={userNameRef}
            />
          </div>
          <div className="signup-input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
            />
          </div>
          <div className="signup-input">
            <label htmlFor="password-confirm">
              Password confirm<span ref={confirmLabelSpan}></span>
            </label>
            <input
              type="password"
              id="password-confirm"
              name="password-confirm"
              ref={confirmRef}
            />
          </div>
        </div>
        <div
          className="signup-button signup-main-button  btn"
          onClick={signUp}
        >Sign up</div>
      </div>
    </section>
  );
}
