import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DropdownMenu.css';

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <div className="dropdown-container">
            <button 
                className="dropdown-toggle"
                onClick={toggleDropdown}
                onBlur={closeDropdown}
            >
                Menu ▾
            </button>
            
            {isOpen && (
                <div className="dropdown-menu">
                    <Link to="/products" className="dropdown-item" onClick={closeDropdown}>
                        All Products
                    </Link>
                    <Link to="/categories" className="dropdown-item" onClick={closeDropdown}>
                        Categories
                    </Link>
                    <Link to="/artisans" className="dropdown-item" onClick={closeDropdown}>
                        Our Artisans
                    </Link>
                    <Link to="/about" className="dropdown-item" onClick={closeDropdown}>
                        About Us
                    </Link>
                    <Link to="/contact" className="dropdown-item" onClick={closeDropdown}>
                        Contact
                    </Link>
                    <Link to="/support" className="dropdown-item" onClick={closeDropdown}>
                        Customer Support
                    </Link>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;