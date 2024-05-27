import React from 'react'
import BackIcon from './BackIcon'
const Reports = () => {
    const goBack = () => {
        alert("Go Back!")
    }
  return (
    <div>
     <BackIcon onClick={goBack}/>
      Reports
    </div>
  )
}

export default Reports
