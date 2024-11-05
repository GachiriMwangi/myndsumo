import React, { useState, useEffect } from 'react';
import {
  BsGrid1X2Fill,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from 'react-icons/bs';
import axios from 'axios';
import './Sidebar.css'

function Sidebar({ openSidebarToggle, OpenSidebar, getCount }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [zipFiles, setZipFiles] = useState([]);
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchZipFiles = async () => {
      try {
        const response = await axios.get('http://localhost:4000/zip-files');
        setZipFiles(response.data);
        const length = response.data.length
        setCount(length)
      } catch (error) {
        console.error('Error fetching zip files:', error);
      }
    };

    fetchZipFiles();
  }, []);
 getCount(count)
  const handleDownload = (fileName) => {
    const link = document.createElement('a');
    link.href = `/${fileName}`;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          The Explorers Den
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <a href="#" onClick={toggleDropdown}>
            <BsGrid1X2Fill className='icon' /> Dashboard
          </a>
          {showDropdown && (
            <ul className='dropdown'>
              {zipFiles.map((file, index) => (
                <li key={index} onClick={() => handleDownload(file)}>
                  {file.replace('.zip', '')}
                </li>
              ))}
            </ul>
          )}
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsMenuButtonWideFill className='icon' /> Reports
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsFillGearFill className='icon' /> Setting
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
