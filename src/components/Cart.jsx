import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Cart({ cart, updateQuantity, removeFromCart }) {
  const navigate = useNavigate()

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  if (cart.length === 0) {
    return (
      <div className="container">
        <div className="card">
          <h2>Your Cart is Empty</h2>
          <p>Discover amazing tribal crafts and add them to your cart!</p>
          <Link to="/">
            <button className="btn btn-primary">Continue Shopping</button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Shopping Cart</h2>
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img 
              src={item.image} 
              alt={item.name}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <div className="product-price">${item.price}</div>
            </div>
            <div className="cart-item-controls">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="quantity-btn"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="quantity-btn"
              >
                +
              </button>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="btn btn-danger"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="cart-total">
          Total: ${total.toFixed(2)}
        </div>
        <div style={{ textAlign: 'right' }}>
          <Link to="/">
            <button className="btn btn-secondary" style={{ marginRight: '10px' }}>
              Continue Shopping
            </button>
          </Link>
          <button 
            onClick={() => navigate('/checkout')}
            className="btn btn-primary"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart