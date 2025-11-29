import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Checkout({ cart, clearCart }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: ''
  })
  const [showConfirmation, setShowConfirmation] = useState(false)
  const navigate = useNavigate()

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowConfirmation(true)
    clearCart()
  }

  const closeModal = () => {
    setShowConfirmation(false)
    navigate('/')
  }

  return (
    <div className="container">
      <div className="checkout-form card">
        <h2>Checkout</h2>
        
        <div className="cart-summary">
          <h3>Order Summary</h3>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ borderTop: '2px solid #eee', paddingTop: '10px', fontWeight: 'bold' }}>
            Total: ${total.toFixed(2)}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <h3>Shipping Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
            <div className="form-group">
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>State:</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>ZIP Code:</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <h3>Payment Method</h3>
          <div className="payment-methods">
            <label className={`payment-method ${formData.paymentMethod === 'credit' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="credit"
                onChange={handleChange}
                required
                style={{ display: 'none' }}
              />
              Credit Card
            </label>
            <label className={`payment-method ${formData.paymentMethod === 'debit' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="debit"
                onChange={handleChange}
                style={{ display: 'none' }}
              />
              Debit Card
            </label>
            <label className={`payment-method ${formData.paymentMethod === 'paypal' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                onChange={handleChange}
                style={{ display: 'none' }}
              />
              PayPal
            </label>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
            Place Order
          </button>
        </form>
      </div>

      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Order Confirmed!</h2>
            <p>Your order has been placed successfully.</p>
            <p>Thank you for supporting tribal artisans!</p>
            <button onClick={closeModal} className="btn btn-primary" style={{ marginTop: '20px' }}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout