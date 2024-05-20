import React from 'react'
import SignUp from './SignUp'
import {useState, useEffect} from 'react'
const Home = () => { 
const [token, setToken] = useState(localStorage.getItem('token'))

useEffect(() => {
  if (token){
    localStorage.setItem('token', token)
  }
  else {
    localStorage.removeItem('token')
  }
}, [token])
  return (
    <div>
      {
        token ? (
          <h1>Token Available.</h1> 
        ) : (
          <h1>Token not available!</h1>
        )
      }
    </div>
  )
}

export default Home
