import React from 'react'
import './home.css'
import { useNavigate } from 'react-router';

export default function Home() {
  const navigate = useNavigate();
  const loginRoute = () => {
    navigate('/login')
  }
  return (
    <main className = "home-main">
    <section className = "home-section">
        <h1>Your App</h1>
        <div className = "home-enter-btn enter-button btn"onClick={loginRoute}>Enter</div>
    </section>    
    </main>
  )
}
