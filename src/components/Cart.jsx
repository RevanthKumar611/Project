import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Cart({ cart, updateQuantity, removeFromCart }) {
  const navigate = useNavigate()

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  if (cart.length === 0) {
    return (
      <div className="container">
        <div className="card" style={{ backgroundColor: '#f8f9fa', color: '#2c3e50', padding: '40px', textAlign: 'center', borderRadius: '10px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Your Cart is Empty</h2>
          <p style={{ color: '#555555', fontSize: '1.1rem', marginBottom: '25px' }}>Discover amazing tribal crafts and add them to your cart!</p>
          <Link to="/">
            <button className="btn btn-primary">Continue Shopping</button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="card" style={{ backgroundColor: '#f8f9fa', color: '#2c3e50', padding: '30px', borderRadius: '10px' }}>
        <h2 style={{ color: '#2c3e50', marginBottom: '25px', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>Shopping Cart</h2>
        {cart.map(item => (
          <div key={item.id} className="cart-item" style={{ backgroundColor: 'white', padding: '20px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
            <img 
              src={item.image} 
              alt={item.name}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3 style={{ color: '#2c3e50', marginBottom: '8px' }}>{item.name}</h3>
              <div className="product-price" style={{ color: '#e74c3c', fontSize: '1.2rem', fontWeight: 'bold' }}>${item.price}</div>
            </div>
            <div className="cart-item-controls">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="quantity-btn"
                style={{ backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px', margin: '0 5px' }}
              >
                -
              </button>
              <span style={{ color: '#2c3e50', fontWeight: 'bold', margin: '0 10px' }}>{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="quantity-btn"
                style={{ backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px', margin: '0 5px' }}
              >
                +
              </button>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="btn btn-danger"
                style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 15px', marginLeft: '10px' }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="cart-total" style={{ color: '#2c3e50', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'right', marginTop: '20px', paddingTop: '15px', borderTop: '2px solid #3498db' }}>
          Total: ${total.toFixed(2)}
        </div>
        <div style={{ textAlign: 'right', marginTop: '25px' }}>
          <Link to="/">
            <button className="btn btn-secondary" style={{ marginRight: '10px', backgroundColor: '#95a5a6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px' }}>
              Continue Shopping
            </button>
          </Link>
          <button 
            onClick={() => navigate('/checkout')}
            className="btn btn-primary"
            style={{ backgroundColor: '#2ecc71', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '5px' }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart