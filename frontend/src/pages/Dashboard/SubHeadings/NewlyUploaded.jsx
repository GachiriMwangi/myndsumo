import React, {useState, useEffect} from 'react'
import BackIcon from './BackIcon'
import axios from 'axios'
import CovidDashboard from '../../../Images/CovidDashboard.png'
import './UploadedDashboards.css'

const NewlyUploaded = ({setHome, setNewlyUploaded}) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchZipFiles = async () => {
      try {
        const response = await axios.get('http://localhost:4000/zip-files');
       return setData(response.data);     
      } catch (error) {
        console.error('Error fetching zip files:', error);
      }
    };

    fetchZipFiles();
  }, []);

  const goBack = () => {
    setHome(() => true)  
    setNewlyUploaded(() => false)
  }

  const handleDownload = () => {
    const zipFileUrl = '/covid19dashboard.zip'; 
    const link = document.createElement('a');
    link.href = zipFileUrl;
    link.setAttribute('download', 'covid19dashboard.zip'); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div>
      <BackIcon onClick={goBack} />
      <br />   
      {
        /* <img 
        src={CovidDashboard} 
        alt="Covid Dashboard" 
        style={{ width: '60%', height: '60%' }}
      />
      
      <br />
      <button onClick={handleDownload}>
        Download Dashboard
      </button>
      */
      }
      
      <div className="zip-files-container">
      {data.map((file, index) => (
        <div className="zip-file-item" key={index} onClick={() => handleDownload(file)}>
          <span className="zip-file-name">{file.replace('.zip', '')}</span>
          <button className="download-button">Download</button>
        </div>
      ))}
    </div>
    </div>
  )
}

export default NewlyUploaded
