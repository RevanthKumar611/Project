import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { products } from '../data/products'

function ProductDetails({ addToCart }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return <div className="container">Product not found</div>
  }

  const handleAddToCart = () => {
    addToCart(product)
    navigate('/cart')
  }

  return (
    <div className="container">
      <div className="product-details">
        <div>
          <img 
            src={product.image} 
            alt={product.name}
            className="product-details-image"
          />
        </div>
        <div className="product-details-info" style={{ color: '#2c3e50', backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '10px', border: '1px solid #dee2e6' }}>
          <h1 style={{ color: '#2c3e50', fontSize: '2.5rem', marginBottom: '15px' }}>{product.name}</h1>
          <div className="product-details-price" style={{ color: '#e74c3c', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '20px' }}>${product.price}</div>
          <p className="product-description" style={{ color: '#555555', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>{product.description}</p>
          <p style={{ color: '#34495e', fontSize: '1.1rem' }}><strong>Category:</strong> {product.category}</p>
          <button onClick={handleAddToCart} className="btn btn-primary" style={{ marginTop: '20px' }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails