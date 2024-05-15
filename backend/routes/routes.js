import { Router } from "express";
import User from "../models/userModel.js"
const router = Router()


router.post("/user", async (req, res) => {
try{
if(!req.body.firstname || !req.body.lastname || !req.body.email){
    return res.status(400).send({
        message: "Send all required fields "
    })
}
const {firstname, lastname, email, password, checkbox} = req.body
const newUser = {
    firstname, 
    lastname,
    email, 
    password, 
    checkbox 
} 

const user = await User.create(newUser)

return res.status(201).json(user)

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
     res.status(400).json({
            msg: "User not found."
        })
    }
    else{      
        if(user.password === password){
            res.status(200).json({
                msg: "Authorized."
            })
        }
        else{
            res.status(400).json({
                msg: "Incorrect Credentials."
            })
        }
    }     
})

//Update a book

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

export default router