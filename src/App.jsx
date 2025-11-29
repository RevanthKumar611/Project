import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const savedCart = localStorage.getItem('cart')
    if (savedUser) setUser(JSON.parse(savedUser))
    if (savedCart) setCart(JSON.parse(savedCart))
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setCart([])
    localStorage.removeItem('user')
    localStorage.removeItem('cart')
  }

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    let newCart
    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    } else {
      newCart = [...cart, { ...product, quantity: 1 }]
    }
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId)
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId)
      return
    }
    const newCart = cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    )
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('cart')
  }

  return (
    <Router>
      <div className="App">
        {user && <Navbar user={user} logout={logout} cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />}
        <Routes>
          <Route path="/login" element={!user ? <Login onLogin={login} /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/product/:id" element={user ? <ProductDetails addToCart={addToCart} /> : <Navigate to="/login" />} />
          <Route path="/cart" element={user ? <Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} /> : <Navigate to="/login" />} />
          <Route path="/checkout" element={user ? <Checkout cart={cart} clearCart={clearCart} /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App