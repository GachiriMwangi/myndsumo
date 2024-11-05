import React, {useState, useEffect} from 'react'
import { fetchData } from '../../Routes/fetchData'
import axios from 'axios'
const Sample = () => {

    const [data, setData] = useState([]) 

    useEffect(() => {
        axios.get('http://localhost:4000/api/data') 
        .then((response) => {
            setData(response.data)
        })
        .catch((error) => console.log(error))
    }, [])
    console.log(data.charts)
  return (
    <div>
      FetchData
    </div>
  )
}

export default Sample
