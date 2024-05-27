import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'

const DashboardHeader = ({setActiveState}) => {    
    const style = {
        cursor: 'pointer'
    }
  return (
    <div>
              <div className='main-title'
              onClick={() => setActiveState('home')}
              style={style}
              >
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'
             style={style}
             onClick={() => setActiveState('newlyUploaded')}
             >
                <div className='card-inner'>
                    <h3>NEWLY UPLOADED DASHBOARDS</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>300</h1>
            </div>
            <div className='card' style={style}
            onClick={() => setActiveState('categories')}
            >
                <div className='card-inner'>
                    <h3>CATEGORIES</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>12</h1>
            </div>
            <div className='card' style={style}
            onClick={() => setActiveState('reports')}
            >
                <div className='card-inner'>
                    <h3>REPORTS</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>33</h1>
            </div>
            <div className='card' style={style}
            onClick={() => setActiveState('alerts')}            >
                <div className='card-inner'>
                    <h3>ALERTS</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>42</h1>
            </div>
        </div>
    </div>
  )
}

export default DashboardHeader
