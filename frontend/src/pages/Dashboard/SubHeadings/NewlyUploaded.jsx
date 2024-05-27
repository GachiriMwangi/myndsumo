import React from 'react'
import BackIcon from './BackIcon'
const NewlyUploaded = ({setHome}) => {
  const goBack = () => {
   setHome(() => true)  
  }

  return (
    <div>
      <BackIcon 
       onClick={goBack}
      />
      <br />
      Newly Uploaded Dashboards
    </div>
  )
}

export default NewlyUploaded
