import userModel from "../models/userModel.js"
import {hashPassword} from "../utils/auth_util.js"
export const userController= async(req,res) => {
    try {
        const {name,email,contact,password,address}=req.body
        if(!name){
            return res.send({error:'Name is required'})
        }
        if(!email){
            return res.send({error:'Email is required'})
        }
        if(!contact){
            return res.send({error:'Contact is required'})
        }
        if(!password){
            return res.send({error:'Password is required'})
        }

        //checking if user already exists

        const userexists= await userModel.findOne({ $or:[{email}, {contact}]})

        if (userexists){
            return res.status(200).send({
                success:false,
                message:'User Already Exists. Please Login',
            })
        }

        //hashing the password
        const hashedPassword= await hashPassword(password)
 
        //saving user
        const user=new userModel({name,email,contact,password:hashedPassword,address}).save()

        res.status(201).send({
            success:true,
            message:'User Registration Successful',
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error!!!. Please Try Again'
        })
    }
}