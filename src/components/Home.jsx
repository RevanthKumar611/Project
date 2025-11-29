import React from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'

function Home() {
  return (
    <div className="container">
      <div className="card">
        <h1>Welcome to Tribal Crafts Marketplace</h1>
        <p>Discover authentic handmade crafts created by tribal artisans from around the world.</p>
      </div>
      
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img 
              src={product.image} 
              alt={product.name}
              className="product-image"
            />
            <div className="product-info">
              <h3>{product.name}</h3>
              <div className="product-price">${product.price}</div>
              <Link to={`/product/${product.id}`}>
                <button className="btn btn-primary">View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home