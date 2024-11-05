import React, {useState, useEffect} from 'react'
import Body from './Body';
import DashboardHeader from './SubHeadings/DashboardHeader';
import NewlyUploaded from './SubHeadings/NewlyUploaded'
import Categories from './SubHeadings/Categories'
import Reports from './SubHeadings/Reports'
import Alerts from './SubHeadings/Alerts'
function Home({countDashboards}) {
  const [home, setShowHome] = useState(true)
  const [newlyUploaded, setNewlyUploaded] = useState(false)
  const [categories, setCategories] = useState(false)
  const [reports, setReports] = useState(false)
  const [alerts, setAlerts] = useState(false)

  const setActiveState = (activeState) => {
    setShowHome(activeState === 'home');
    setNewlyUploaded(activeState === 'newlyUploaded');
    setCategories(activeState === 'categories');
    setReports(activeState === 'reports');
    setAlerts(activeState === 'alerts');
  };


  const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
     

  return (
    <main className='main-container'>
      { home && (
        <>
          <DashboardHeader 
            setActiveState={setActiveState}
            count={countDashboards}
          />
       
          </>
      )    
          
                
      }
      {
        newlyUploaded && (
          <>
        <NewlyUploaded 
        setHome={setShowHome}
        setNewlyUploaded={setNewlyUploaded}/>
          </>
        )
      }      
         
       {
        alerts && (
          <>
          <Alerts setHome={setShowHome} /></>
        )
       }

    
    </main>
  )
}

export default Home