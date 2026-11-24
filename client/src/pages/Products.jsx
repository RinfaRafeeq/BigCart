
import { useState, useEffect } from 'react'
import axios from 'axios'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch products from MongoDB
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products')
        setProducts(response.data.product)
      } catch (error) {
        setError('Failed to fetch products')
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Add to Cart
  const handleAddToCart = async (product) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/add-to-cart',
      {
        id: product._id,
        price: product.discountPrice && product.discountPrice < product.price
          ? product.discountPrice
          : product.price
      },
      {
        withCredentials: true
      }
    )

    alert(response.data.message)

  } catch (error) {
    console.log(error)
    alert('Failed to add product to cart')
  }
}

  // Buy Now
  const handleBuyNow = (product) => {
    console.log('Buy now:', product.productName)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <h2 className="text-xl font-semibold text-purple-600">
          Loading products...
        </h2>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-5 py-12">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">

          <p className="text-purple-600 font-semibold mb-3">
            Discover Something Special
          </p>

          <h1 className="text-4xl font-bold text-gray-900">
            Our Products
          </h1>

          <p className="text-gray-500 mt-3">
            Find your favourites at amazing prices.
          </p>

        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {products.map((product) => (

            <div
              key={product._id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >

              {/* Product Image */}
              <div className="relative">

                <img
                  src={product.images?.[0]}
                  alt={product.productName}
                  className="w-full h-60 object-cover"
                />

                {product.discountPrice &&
                  product.discountPrice < product.price && (
                    <span className="absolute top-3 left-3 bg-pink-500 text-white text-sm font-bold px-3 py-1 rounded-lg">
                      {Math.round(
                        ((product.price - product.discountPrice) /
                          product.price) * 100
                      )}% OFF
                    </span>
                  )}

              </div>

              {/* Product Information */}
              <div className="p-5">

                <p className="text-sm text-purple-600 font-semibold mb-2">
                  {product.category}
                </p>

                <h2 className="text-lg font-bold text-gray-900">
                  {product.productName}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">

                  <span className="text-yellow-500">
                    ★
                  </span>

                  <span className="text-sm text-gray-600">
                    {product.ratings}
                  </span>

                  <span className="text-xs text-gray-400">
                    ({product.numReviews} reviews)
                  </span>

                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mt-4">

                  {product.discountPrice &&
                    product.discountPrice < product.price ? (
                      <>
                        <p className="text-xl font-bold text-purple-700">
                          ₹{product.discountPrice.toLocaleString('en-IN')}
                        </p>

                        <p className="text-sm text-gray-400 line-through">
                          ₹{product.price.toLocaleString('en-IN')}
                        </p>
                      </>
                    ) : (
                      <p className="text-xl font-bold text-purple-700">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    )}

                </div>

                {/* Stock */}
                <p className={`text-sm mt-3 ${
                  product.stock > 0
                    ? 'text-green-600'
                    : 'text-red-500'
                }`}>
                  {product.stock > 0
                    ? `${product.stock} items available`
                    : 'Out of stock'}
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-3 mt-5">

                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock <= 0}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => handleBuyNow(product)}
                    disabled={product.stock <= 0}
                    className="w-full border-2 border-pink-500 text-pink-600 py-3 rounded-lg font-semibold hover:bg-pink-500 hover:text-white transition disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    Buy Now
                  </button>

                </div>

              </div>
            </div>

          ))}

        </div>

        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No products available.
          </p>
        )}

      </div>
    </div>
  )
}

export default Products
