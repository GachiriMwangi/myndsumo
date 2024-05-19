import React from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
 import axios from 'axios'

function Header({OpenSidebar}) {

  const someone = "James"
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>
        <div className='header-right'>
            <BsFillBellFill className='icon'/>
            &nbsp;
            <BsFillEnvelopeFill className='icon'/>
            &nbsp;
            <BsPersonCircle className='icon'/>            
            {
              //should get the first name of the person, and return.
            someone}
        </div>
    </header>
  )
}

export default Header