import React, {useState} from 'react'
import 
 {BsFillBellFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
 import { TextField } from '@mui/material'
import './Header.css'
 import FileUpload from '../../Components/fileUpload'

function Header({OpenSidebar, username, logout}) {


const [search, setSearch] = useState('')
const [showDropdown, setShowDropdown] = useState(false)
const toggleDropdown = () => {
  setShowDropdown((prev) => !prev)
}

const handleLogout = () => {
  setShowDropdown(false) 
  logout()
}

return (
    <header className='header' style={{backgroundColor: '#1d2634'}}>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
            &nbsp;
            &nbsp;
            &nbsp;
            <input type="text"     
            style={{ 
              width: '100px', 
              height: '25px', 
              borderRadius: '5px',
            backgroundColor: 'white'
            }}
              margin="normal"
              placeholder='Search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="search"           
              name="search"
              autoComplete="Search"
             
            />
        </div>
        <div className='header-right'>     
        <span       
         style={{
          cursor: 'pointer', 
          backgroundColor: 'white',
          padding: '5px'
         }}         
         > <FileUpload />
          </span>   
       &nbsp; 
        <BsFillBellFill className='icon'/>           

          {//<BsFillEnvelopeFill className='icon'/>
}            &nbsp;
            <BsPersonCircle className='icon'/>            
            <span onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
            {username}
          </span>
          {showDropdown && (
            <div className='dropdown-menu'>
              <div className='dropdown-item'>Change Profile</div>
              <div className='dropdown-item' onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
    </header>
  )
}

export default Header