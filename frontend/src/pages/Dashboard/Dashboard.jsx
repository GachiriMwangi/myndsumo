import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useSnackbar} from 'notistack'
import './Dashboard.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import { getUserInfo } from '../../Authentication/userAuth'

const Dashboard = ({ onLogout}) => {
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()
  const [username, setUsername] = useState('')
  const token = localStorage.getItem('token')
  useEffect(() => {
    const fetchUserInfo = async() => {
      const data = await getUserInfo(token) 
      if (data.username){
        setUsername(data.username)
      }
    }
    fetchUserInfo()
  }, [token])
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <> 
    {
      token ? (
        <><div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} username={username}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
    </div> </>
      ) : (
        <>
        {
          enqueueSnackbar('Access Denied', {
            variant: 'error'
          })  
            }
            {
              navigate("/")
            }
        </>
      )
    }
    
    </>    
    
  )
}

export default Dashboard