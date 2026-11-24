
import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 px-6 md:px-10 py-4 flex items-center justify-between">

      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        BigCart
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-5 md:gap-8">
        <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
          Home
        </Link>

        <Link to="/products" className="text-gray-700 hover:text-blue-600 transition">
          Products
        </Link>

        <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">
          About
        </Link>

        <Link to="/register" className="text-gray-700 hover:text-blue-600 transition">
          Register
        </Link>
      </nav>

      {/* Cart and Profile */}
      {/* Cart and Profile */}
<div className="flex items-center gap-4">

  <Link
    to="/cart"
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition font-medium"
  >
    Cart
  </Link>

  <Link
    to="/user"
    className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 text-xl hover:bg-blue-200 transition"
    title="My Profile"
  >
    👤
  </Link>

</div>

    </header>
  )
}

export default Header
