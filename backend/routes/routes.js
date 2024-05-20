import { Router } from "express";
import User from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = Router()
const JWT_SECRET = 'mysecret'


router.get("/user", (req, res) => {  

    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            msg: 'Someone Unauthorized!'
        })
    }

    const token = authHeader.split(' ')[1] 
    try{
        const decoded = jwt.verify(token, JWT_SECRET)         
        if(decoded){
             return res.status(200).json({
            username: decoded.firstname
        })
        }       
       
    } 
    catch(error){
        res.status(401).json({
            msg: 'Unauthorized!'
        })
       
    }
})

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
    expiresIn: '1hr'
})
const newUser = {
    firstname, 
    lastname,
    email, 
    password: hashedPassword, 
    checkbox 
} 

const user = await User.create(newUser)

return res.status(201).json({
    msg: "Success", 
    token
})

}
catch(error){
console.log(error)
}
}) 

router.post("/check-user", async(req, res) => {
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
            const username = user.firstname
            const token = jwt.sign({username}, JWT_SECRET, {
                expiresIn: '2hr'
            })
            res.status(200).json({
                msg: "Authorized.", 
                username, 
                token
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
            if(!book){
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

    //Function to verify token.

  

export default router