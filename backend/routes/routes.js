import { Router } from "express";
import User from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import YAML from "yamljs"    
import path from 'path' 
import fs from 'fs'; 
import { dirname } from 'path'
import jwt from 'jsonwebtoken'
import { fileURLToPath } from 'url';
import multer from 'multer'
import AdmZip from 'adm-zip'
import dotenv from 'dotenv'
dotenv.config()

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Ensure the unzipped directory exists
const outputFolderPath = path.join(__dirname, 'unzipped');
if (!fs.existsSync(outputFolderPath)) {
  fs.mkdirSync(outputFolderPath);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage })

const loadYAMLFiles = (dirPath) => {
        const files = fs.readdirSync(dirPath);
    return files.reduce((acc, file) => {
      const filePath = path.join(dirPath, file); 
      if (path.extname(file) === '.yaml') {
        const data = YAML.load(filePath);
        acc[path.basename(file, '.yaml')] = data;
      }
      return acc;
    }, {});
  };

    const chartsFilePath = path.join(__dirname, 'yaml/charts')
    const dashboardsFilePath = path.join(__dirname, 'yaml/dashboards', 'USA_Births_Names_3.yaml')
    const databasesFilePath = path.join(__dirname, 'yaml/databases', 'examples.yaml')
    const datasetsFilePath = path.join(__dirname, 'yaml/datasets/examples', 'birth_names.yaml')

    const charts = loadYAMLFiles(chartsFilePath) 
    const dashboards = YAML.load(dashboardsFilePath)
    const databases = YAML.load(databasesFilePath)
    const datasets = YAML.load(datasetsFilePath)

router.get("/api/data", (req, res) => { 
      return res.status(200).json(        
{   success: true, 
  message: 'Dashboards Retrieved Successfully', 
  data: {
    charts, 
    dashboards, 
    databases,
    datasets, 
  }
    

} 
      )
}) 
 
router.get("/user", (req, res) => {
    
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(401).json({
            msg: 'No token provided!'
        }); 
    }

    const token = authHeader.split(' ')[1]; 
    
    if (!token) {
        return res.status(401).json({
            msg: 'Malformed token!'
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return res.status(200).json(
          {
            success: true, 
            message: 'User retrieved successfully', 
            user_data: decoded
          }
         
        );
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Unauthorized!'
        });
    }
});

router.post('/uploads', upload.single('file'), (req, res) => {
    const file = req.file;
    const newFolderName = 'mindsumo';
  
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
  
    const zipFilePath = path.join(uploadsDir, file.filename);
    console.log('Uploaded file path:', zipFilePath);
  
    try {
      // Create an instance of AdmZip
      const zip = new AdmZip(zipFilePath);
  
      // Extract the contents to a temporary directory
      const tempDir = path.join(outputFolderPath, 'temp');
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
      fs.mkdirSync(tempDir);
  
      zip.getEntries().forEach((entry) => {
        const sanitizedFileName = path.basename(entry.entryName).replace(/[^a-zA-Z0-9.-]/g, '_');
        const fullPath = path.join(tempDir, sanitizedFileName);
  
        if (entry.isDirectory) {
          fs.mkdirSync(fullPath, { recursive: true });
        } else {
          fs.writeFileSync(fullPath, entry.getData());
        }
      });
  
      // Rename the temporary directory to the new folder name
      const newFolderPath = path.join(outputFolderPath, newFolderName);
      if (fs.existsSync(newFolderPath)) {
        fs.rmSync(newFolderPath, { recursive: true, force: true });
      }
      fs.renameSync(tempDir, newFolderPath);
  
      // Clean up the uploaded zip file
      fs.unlinkSync(zipFilePath);
  
      res.status(201).send({
        success: true, 
        message: 'File uploaded, unzipped and renamed successfully.',
      });
    } catch (error) {
      console.error('Error unzipping and renaming folder:', error.message);
      res.status(500).send('Error unzipping and renaming folder.');
    }
  });

router.post("/user", async (req, res) => { 
try{
if(!req.body.firstname || !req.body.lastname || !req.body.email){
    return res.status(400).send({
        message: "Send all the required fields."
    })
}
const {firstname, lastname, email, password, checkbox} = req.body
//Check if a user already exists 
const findUser = await User.findOne({email}) 
if(findUser){
    return res.status(400).json({
        msg: "User already exists" 
    })
}
//Hash password here.
const hashedPassword = await bcrypt.hash(password, 10)
const token = jwt.sign({firstname}, JWT_SECRET, {
    expiresIn: '30d'
})
const newUser = {
    firstname, 
    lastname,
    email, 
    password: hashedPassword, 
    checkbox 
} 

const user = await User.create(newUser)
if(user){
   return res.status(201).json({
    success: true, 
    message: 'User Created Successfully', 
    token
}) 
}
else{
    return res.status(400).json({
        msg: 'An error occurred while signing you in.'
    })
}

}
catch(error){
console.log(error)
}
}) 

router.post("/login", async(req, res) => {
    const email = req.body.email
    const password = req.body.password
    //Check if the email exists  
    const user = await User.findOne({email}) 
    if(!user){
     res.status(200).json({
            msg: "User not found."
        })
    }
    else{    
        const validPass = await bcrypt.compare(password, user.password)             
        if(validPass){
            const username = user.firstname + user.lastname
            const token = jwt.sign({username}, JWT_SECRET, {
                expiresIn: '30d'
            })
            res.status(200).json({
               success: true, 
               message: 'User logged in Successfully', 
               Username: username
            })
        }
        else{
            res.status(400).json({
                msg: "Incorrect Credentials."
            })
        }
    }     
})

    //Delete a user
    router.delete("/users/:id", async(req, res) => {
        try{
            const id = req.params.id
            const userToDelete = await User.findByIdAndDelete(id)    
            if(!userToDelete){
                return res.status(404).json({
                    Msg: "User Not Found."
                })
            }
              return res.status(204).json({
                Msg: "User deleted successfully."
              })            
        }
        catch(error){
            console.log(error) 
            res.status(500).json({
                Msg: "Internal Server error."
            })
        }
    })

   

  

export default router