import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const FileUpload = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(() => {
        enqueueSnackbar("Dashboard exported successfully", {
          variant: 'success'
        });
        setFile(null);
      });

    } catch (error) {
      console.error('Error uploading file:', error);
      enqueueSnackbar("Error uploading file", {
        variant: 'error'
      });
      setFile(null);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload Dashboard</button>
    </div>
  );
};

export default FileUpload;
