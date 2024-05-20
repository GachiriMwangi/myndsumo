import { useState, useEffect } from 'react'
import './Dashboard.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import { getUserInfo } from '../../Authentication/userAuth'

const Dashboard = ({token, onLogout}) => {
  
  const [username, setUsername] = useState('')

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
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
    </div>
  )
}

export default Dashboard