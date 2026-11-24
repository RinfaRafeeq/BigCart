
import { useEffect, useState } from 'react'
import axios from 'axios'

function AdminDashboard() {
  const [message, setMessage] = useState('Loading dashboard...')

  useEffect(() => {
    const getDashboard = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/admin/dashboard',
          { withCredentials: true }
        )

        setMessage(response.data.message)
      } catch (error) {
        console.log(error)
        setMessage('Unable to load dashboard.')
      }
    }

    getDashboard()
  }, [])

  const stats = [
    { title: 'Total Products', value: '—', icon: '📦' },
    { title: 'Total Users', value: '—', icon: '👥' },
    { title: 'Total Orders', value: '—', icon: '🛍️' },
    { title: 'Total Revenue', value: '—', icon: '₹' }
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your BigCart store from here.
        </p>
      </div>

      {/* Welcome section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome, Admin!
        </h2>

        <p className="text-gray-600 mt-2">
          {message}
        </p>
      </div>

      {/* Overview cards */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Store Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex justify-between items-center">
              <p className="text-gray-500">
                {item.title}
              </p>

              <span className="text-2xl">
                {item.icon}
              </span>
            </div>

            <h3 className="text-3xl font-bold text-gray-800 mt-4">
              {item.value}
            </h3>

            <p className="text-sm text-gray-400 mt-2">
              Data connection coming next
            </p>
          </div>
        ))}

      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-800">
          Recent Orders
        </h2>

        <p className="text-gray-500 mt-3">
          Your recent customer orders will appear here.
        </p>
      </div>

    </div>
  )
}

export default AdminDashboard
