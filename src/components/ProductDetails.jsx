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
        <div className="product-details-info">
          <h1>{product.name}</h1>
          <div className="product-details-price">${product.price}</div>
          <p className="product-description">{product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <button onClick={handleAddToCart} className="btn btn-primary">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails