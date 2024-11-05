const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const cors = require('cors')

const app = express();
const PORT = 4000;

app.use(fileUpload());
app.use(cors())
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

// Upload endpoint
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e., "file") is used to retrieve the uploaded file
  let uploadedFile = req.files.file;
  let uploadPath = path.join(__dirname, 'public', uploadedFile.name);

  // Use the mv() method to place the file somewhere on your server
  uploadedFile.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
    res.send('File uploaded to ' + uploadPath);
  });
});

app.get('/zip-files', (req, res) => {
    const publicDir = path.join(__dirname, 'public');
    
    fs.readdir(publicDir, (err, files) => {
      if (err) {
        return res.status(500).send('Unable to scan directory');
      }
      const zipFiles = files.filter(file => path.extname(file) === '.zip');
      res.json(zipFiles);
    });
  });
  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
