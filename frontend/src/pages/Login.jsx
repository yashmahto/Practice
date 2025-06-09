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
    <div className='flex flex-col items-center h-screen justify-center
    bg-gradient-to-b from-pink-600 from-50% to-gray-100 to-50% space-y-6'>
       
        <h2 className='font-sevillana text-3xl text-white'>LifeLinkr</h2>
        
        <div className='border shadow p-6 w-80 bg-white'>
            <h2 className='text-2xl font-bold mb-4'>Login </h2>
            {error && <p className='text-red-500'>{error}</p>}
            <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                <label htmlFor="name" className='block text-gray-700 '>Email</label>
                <input 
                type="text"
                className='w-full px-3 py-2 border'
                 placeholder="Enter Username"
                 onChange={(e) => setEmail(e.target.value)}
                 required
                  />
            </div>
            <div className='mb-4'>
                <label htmlFor="password" className='block text-gray-700'>Password</label>
                <input 
                type="password"
                className='w-full px-3 py-2 border'
                onChange={(e) => setPassword(e.target.value)}
                required
                 placeholder="*********"
                   />
            </div>
            <div>
                <button
                type='submit'
                className='w-full bg-pink-600 text-white py-2'
                >
                    Login
                </button>
            </div>
        </form>
        </div>
        
    </div>
  )
}

export default Login