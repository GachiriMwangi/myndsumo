import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useSnackbar} from 'notistack'
import './Dashboard.css'
import Header from './Header'
import Sidebar from './Sidebar' 
import Home from './Home'
import { getUserInfo } from '../../Authentication/userAuth'

const Dashboard = () => { 
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()
  const [username, setUsername] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    if(!token){
      enqueueSnackbar('Access Denied', {
        variant: 'error'            
      })  
      navigate("/signin")
    }
    const fetchUserInfo = async() => {
      const data = await getUserInfo(token) 
      if (data.username){
        //console.log(data)
        setUsername(data.username)
      }
    }
    fetchUserInfo()
  }, [token])
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const logout = () => {
    localStorage.removeItem(token) 
    localStorage.removeItem(username)
    enqueueSnackbar("Logout was successful. ", {
      variant: 'success'
    })
    navigate("/signin")
  }

  return (
    <> 
    {
      token ? (
        <><div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} username={username} logout={logout}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
    </div> </>
      ) : (    
        null    
          // return (
          
          // )
      )
    }
    
    </>    
    
  )
}

export default Dashboard