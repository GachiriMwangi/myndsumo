import React from 'react'
import BackIcon from './BackIcon'
import {useNavigate} from 'react-router-dom'
const Alerts = () => {
    const navigate = useNavigate()
const goBack = () => {
    navigate("/dashboard")
}
  return (
    <div>
        <BackIcon 
        onClick={goBack}        
     />
        <br />
      Get Alerts!     
    </div>
  )
}

export default Alerts
