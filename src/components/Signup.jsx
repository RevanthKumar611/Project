import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Captcha from './Captcha'

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const navigate = useNavigate()

  // Clear any browser autofill issues
  useEffect(() => {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
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
    
    if (users.find(u => u.email === formData.email)) {
      alert('User with this email already exists')
      return
    }

    users.push(formData)
    localStorage.setItem('users', JSON.stringify(users))
    
    alert('Registration successful! Please login.')
    navigate('/login')
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Join Tribal Crafts</h2>
        <form onSubmit={handleSubmit} autoComplete="on">
          <div className="form-group">
            <label htmlFor="signup-name">Full Name:</label>
            <input
              id="signup-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="signup-email">Email:</label>
            <input
              id="signup-email"
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
            <label htmlFor="signup-password">Password:</label>
            <input
              id="signup-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              placeholder="Create a password"
            />
          </div>

          {/* CAPTCHA Component */}
          <Captcha onVerify={setCaptchaVerified} />

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={!captchaVerified}
          >
            Sign Up
          </button>
        </form>
        <div className="auth-link">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup