import React, { useState } from 'react'
import axios from "axios"
import { useAuth } from '../context/authContext';
import {useNavigate} from "react-router-dom"

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(null);
    const {login} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login",
                 {email,password});
            if(response.data.success) { 
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                if(response.data.user.role === "admin") {
                    navigate('/admin-dashboard')
                }
                
            }
        } catch (error) {
            if(error.response && !error.response.data.success){
                setError(error.response.data.error)
            }else{
                setError("Server Error")
            }
        } 
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-400 to-blue-100">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md flex flex-col items-center border border-blue-100">
        <h2 className="font-sevillana text-4xl text-indigo-700 mb-2 drop-shadow">Practice</h2>
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Login</h2>
        {error && <p className="text-red-500 mb-4 w-full text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-blue-800 mb-1 font-medium">Email</label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-blue-50/60 text-blue-900 placeholder-blue-400 transition"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-blue-800 mb-1 font-medium">Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-blue-50/60 text-blue-900 placeholder-blue-400 transition"
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="*********"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-blue-500 text-sm">
          Don't have an account? <span className="text-indigo-700 hover:underline cursor-pointer font-semibold">Sign up</span>
        </div>
      </div>
    </div>
  )
}

export default Login