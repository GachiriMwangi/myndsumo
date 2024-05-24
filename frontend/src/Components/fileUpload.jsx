import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack'

const FileUpload = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [file, setFile] = useState(null);
  const [showFile, setShowFile] = useState(false)

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async (event) => {
  event.preventDefault() 

  //setFile(event.target.files[0]);

    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        enqueueSnackbar("Dashboard exported successfully", {
            variant: 'success'
        })        
        setFile(null)
    }
        
    )

      //console.log('File uploaded successfully:', response.data);
    } catch (error) { 
      console.error('Error uploading file:', error);
      setFile(null)
    }
  };

  return (
    <span>
        
     
                      <input type="file" onChange={handleFileChange} />
            
        
      <button onClick={handleFileUpload}>Upload Dashboard</button>
    </span>
  );
};

export default FileUpload;
