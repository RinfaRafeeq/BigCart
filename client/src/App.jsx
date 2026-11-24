import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Products from "./pages/Products"
import Cart from "./pages/Cart"
import UserProfile from "./pages/UserProfile"
import AdminDashboard from './pages/AdminDashboard'

function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/user" element={<UserProfile />} />
                <Route path="/admin" element={<AdminDashboard />} />

            </Routes>

        </>
    )
}

export default App