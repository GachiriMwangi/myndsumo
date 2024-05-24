import React, {useState} from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'

 import FileUpload from '../../Components/fileUpload'

function Header({OpenSidebar, username, logout}) {
const [showDropdown, setShowDropdown] = useState(false)
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
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
            {
            username
            }
        </div>
    </header>
  )
}

export default Header