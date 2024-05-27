import React from 'react'
import SignUp from './SignUp'
import { useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
const Home = () => { 

  const navigate = useNavigate()
const [token] = useState(localStorage.getItem('token'))

useEffect(() => {
  if (token){
    navigate("/dashboard")
  }
  else {
    localStorage.removeItem('token')
    navigate("/signin")
  }
}, [token])
  return null
}

export default Home
