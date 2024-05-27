import React from 'react'
import { useNavigate} from 'react-router-dom'
import BackIcon from './BackIcon'
const Categories = () => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate("/dashboard")
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
