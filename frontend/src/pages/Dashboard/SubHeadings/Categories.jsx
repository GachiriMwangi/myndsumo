import React from 'react'
import BackIcon from './BackIcon'
const Categories = ({setHome}) => {
    const goBack = () => {
        setHome(() => true)
    }
  return (
    <div>
        <BackIcon 
        onClick={goBack}
        />
      Categories
    </div>
  )
}

export default Categories
