import React from 'react'
import BackIcon from './BackIcon'
const Alerts = ({setHome}) => {    
const goBack = () => {  
    setHome(() => true)
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
