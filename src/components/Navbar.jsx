import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar({ user, logout, cartCount }) {
  const location = useLocation()

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Tribal Crafts
      </Link>
      <div className="navbar-nav">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Home
        </Link>
        <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>
          Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
        <span>Welcome, {user?.name}</span>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar