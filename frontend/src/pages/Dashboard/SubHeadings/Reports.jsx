import React from 'react'
import BackIcon from './BackIcon'
const Reports = ({setHome}) => {
    const goBack = () => {
       setHome(() => true)
    }
  return (
    <div>
     <BackIcon onClick={goBack}/>
      Reports
    </div>
  )
}

export default Reports
