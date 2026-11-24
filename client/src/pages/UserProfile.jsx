
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function UserProfile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  // Get user profile
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/profile',
          {
            withCredentials: true
          }
        )

        setUser(response.data.user)

      } catch (error) {
        console.log(error)
        alert('Please login to view your profile')
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }

    getProfile()
  }, [navigate])

  // Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:5000/logout',
        {},
        {
          withCredentials: true
        }
      )

      navigate('/login')

    } catch (error) {
      console.log(error)
      alert('Logout failed')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-purple-600">
          Loading profile...
        </h2>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-5 py-12">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          My Profile
        </h1>

        <div className="bg-white rounded-2xl shadow-md p-8">

          {/* Profile Icon */}
          <div className="flex flex-col items-center mb-8">

            <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center text-4xl text-purple-600 font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-4">
              {user.name}
            </h2>

            <p className="text-gray-500">
              {user.role}
            </p>

          </div>

          {/* User Details */}
          <div className="space-y-5">

            <div className="border-b pb-4">
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-semibold text-gray-800 mt-1">
                {user.name}
              </p>
            </div>

            <div className="border-b pb-4">
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-semibold text-gray-800 mt-1">
                {user.email}
              </p>
            </div>

            <div className="border-b pb-4">
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-semibold text-gray-800 mt-1">
                {user.phone || 'Not provided'}
              </p>
            </div>

            <div className="border-b pb-4">
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="font-semibold text-gray-800 mt-1">
                {user.role}
              </p>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">

            <button
              onClick={handleLogout}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Logout
            </button>

            <Link
              to="/"
              className="flex-1 text-center border-2 border-purple-500 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition"
            >
              Back to Home
            </Link>

          </div>

        </div>
      </div>
    </div>
  )
}

export default UserProfile
