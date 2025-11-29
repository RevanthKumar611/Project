import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Captcha from './Captcha'

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const navigate = useNavigate()

  // Clear any browser autofill issues on component mount
  useEffect(() => {
    // Force clear any duplicate inputs that might be created by browser autofill
    const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
    inputs.forEach(input => {
      if (input.hasAttribute('data-autofilled')) {
        input.value = '';
      }
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!captchaVerified) {
      alert('Please complete the CAPTCHA verification')
      return
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === formData.email && u.password === formData.password)
    
    if (user) {
      onLogin(user)
      navigate('/')
    } else {
      alert('Invalid email or password')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to Tribal Crafts</h2>
        <form onSubmit={handleSubmit} autoComplete="on">
          <div className="form-group">
            <label htmlFor="login-email">Email:</label>
            <input
              id="login-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password:</label>
            <input
              id="login-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
            />
          </div>

          {/* CAPTCHA Component */}
          <Captcha onVerify={setCaptchaVerified} />

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={!captchaVerified}
          >
            Login
          </button>
        </form>
        <div className="auth-link">
          <p>Not registered yet? <Link to="/signup">Sign up here</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login