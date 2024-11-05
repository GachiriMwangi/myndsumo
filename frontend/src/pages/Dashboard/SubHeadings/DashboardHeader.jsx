import React, {useState, useEffect} from 'react'
import axios from 'axios'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'

const DashboardHeader = ({setActiveState, count}) => {    

    const [countDash, setCountDash] = useState([])


    useEffect(() => {
        const fetchZipFiles = async () => {
          try {
            const response = await axios.get('http://localhost:4000/zip-files');
           return setCountDash(response.data);     
          } catch (error) {
            console.error('Error fetching zip files:', error);
          }
        };
    
        fetchZipFiles();
      }, []);
    const totalDashboards = countDash.length
    const style = {
        cursor: 'pointer'
    }
    
    //console.log(count)
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
                <h1>{totalDashboards}</h1>
            </div>
            <div className='card' style={style}
            onClick={() => setActiveState('alerts')}            >
                <div className='card-inner'>
                    <h3>ALERTS</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>2</h1>
            </div>
        </div>
    </div>
  )
}

export default DashboardHeader
