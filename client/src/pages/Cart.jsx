
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Cart() {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Get cart from backend
  const getCart = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/cart',
        {
          withCredentials: true
        }
      )

      setCart(response.data.cart)

    } catch (error) {
      console.log(error)
      setError('Please login to view your cart')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCart()
  }, [])

  // Increase or decrease quantity
  const updateQuantity = async (id, action) => {
    try {
      await axios.put(
        `http://localhost:5000/cart/${id}/${action}`,
        {},
        {
          withCredentials: true
        }
      )

      getCart()

    } catch (error) {
      console.log(error)
      alert('Failed to update quantity')
    }
  }

  // Remove product
  const removeProduct = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/cart/${id}`,
        {
          withCredentials: true
        }
      )

      getCart()

    } catch (error) {
      console.log(error)
      alert('Failed to remove product')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-purple-600">
          Loading your cart...
        </h2>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-purple-50">
        <h2 className="text-2xl font-bold text-gray-800">
          {error}
        </h2>

        <Link to="/login" className="mt-5 bg-purple-600 text-white px-6 py-3 rounded-lg">
          Login
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-5 py-12">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          My Shopping Cart
        </h1>

        {/* Empty Cart */}
        {!cart || cart.items.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-md p-10 text-center">

            <h2 className="text-2xl font-bold text-gray-800">
              Your cart is empty!
            </h2>

            <p className="text-gray-500 mt-3">
              Looks like you haven't added anything yet.
            </p>

            <Link
              to="/products"
              className="inline-block mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
            >
              Continue Shopping
            </Link>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Cart Products */}
            <div className="md:col-span-2 space-y-5">

              {cart.items.map((item) => (

                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-md p-5 flex flex-col sm:flex-row items-center gap-5"
                >

                  {/* Product Image */}
                  <img
                    src={item.product?.images?.[0]}
                    alt={item.product?.productName || 'Product'}
                    className="w-28 h-28 object-contain"
                  />

                  {/* Product Details */}
                  <div className="flex-1 text-center sm:text-left">

                    <h2 className="text-lg font-bold text-gray-800">
                      {item.product?.productName || 'Product unavailable'}
                    </h2>

                    <p className="text-purple-700 font-semibold mt-2">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>

                    <button
                      onClick={() => removeProduct(item.product._id)}
                      disabled={!item.product}
                      className="text-red-500 text-sm mt-3 hover:underline"
                    >
                      Remove
                    </button>

                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-4">

                    <button
                      onClick={() => updateQuantity(item.product._id, 'decrement')}
                      disabled={item.quantity <= 1 || !item.product}
                      className="bg-purple-100 px-3 py-1 rounded-lg disabled:opacity-40"
                    >
                      -
                    </button>

                    <span className="font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.product._id, 'increment')}
                      disabled={!item.product}
                      className="bg-purple-100 px-3 py-1 rounded-lg"
                    >
                      +
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-md p-6 h-fit">

              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between text-gray-600 mb-4">
                <span>Total Items</span>

                <span>
                  {cart.items.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="flex justify-between border-t pt-4 text-lg font-bold">
                <span>Total Price</span>

                <span className="text-purple-700">
                  ₹{cart.totalPrice.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                className="w-full bg-purple-600 text-white py-3 rounded-lg mt-6 hover:bg-purple-700"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="block text-center text-purple-600 mt-5 hover:underline"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        )}

      </div>
    </div>
  )
}

export default Cart
