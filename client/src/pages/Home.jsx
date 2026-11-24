
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {

  const [products, setProducts] = useState([])

  // Fetch products from backend
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products')
        setProducts(response.data.product)
      } catch (error) {
        console.log(error)
      }
    }

    getProducts()
  }, [])

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Welcome Section */}
      <section className="text-center py-16 px-4 bg-white">

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to BigCart!
        </h1>

        <p className="text-gray-500 text-lg mb-6">
          Discover amazing products at great prices.
        </p>

        <Link
          to="/products"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Shop Now
        </Link>

      </section>

      {/* Categories */}
      <section className="px-8 py-10">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {['Footwear', 'Fashion', 'Electronics', 'Accessories'].map((category) => (
            <Link
              to="/products"
              key={category}
              className="bg-white p-6 rounded-lg shadow-sm text-center font-semibold text-gray-700 hover:shadow-md"
            >
              {category}
            </Link>
          ))}

        </div>

      </section>

      {/* Featured Products */}
      <section className="px-8 py-10">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {products.slice(0, 4).map((product) => (

            <div key={product._id} className="bg-white p-4 rounded-lg shadow-sm">

              <img
                src={product.images?.[0]}
                alt={product.productName}
                className="w-full h-40 object-contain mb-4"
              />

              <h3 className="font-semibold text-gray-800">
                {product.productName}
              </h3>

              <p className="text-gray-600 mt-2">
                ₹{product.discountPrice ?? product.price}
              </p>

              <Link
                to="/products"
                className="block text-center mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                View Products
              </Link>

            </div>

          ))}

        </div>

      </section>

    </main>
  )
}

export default Home

