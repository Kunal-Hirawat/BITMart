import userModel from "../models/userModel.js"
import { hashPassword , comparePassword } from "../utils/auth_util.js"
import JWT from 'jsonwebtoken'

export const registerContoller= async(req,res) => {
    try {
        const {name,email,contact,password,address}=req.body
        if(!name){
            return res.send({message:'Name is required'})
        }
        if(!email){
            return res.send({message:'Email is required'})
        }
        if(!contact){
            return res.send({message:'Contact is required'})
        }
        if(!password){
            return res.send({message:'Password is required'})
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

export const loginController= async(req,res) =>{
    try {
        const {email,contact,password}=req.body

        //checking if email/contact and password are entered

        if((!email && !contact) || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email/contact or password'
            })
        }

        var user=false;

        if(email && !contact){
            user=await userModel.findOne({email})
            if(!user){
                return res.status(404).send({
                    success:false,
                    message:'User Not Found'
                })
            }
        }
        else if(contact && !email){
            user=await userModel.findOne({contact})
            if(!user){
                return res.status(404).send({
                    success:false,
                    message:'User Not Found'
                })
            }
        }
        else{
            user=await userModel.findOne({contact,email})
            if(!user){
                return res.status(404).send({
                    success:false,
                    message:'User Not Found'
                })
            }
        }

        //checking if password is correct or not

        const correctPassword= await comparePassword(password,user.password);
        if(!correctPassword){
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            })
        }

        //extracting token

        const token =await JWT.sign({_id:user._id},process.env.JWT_KEY,{expiresIn: "7d"});
        res.status(200).send({
            success:true,
            message:'Login Successful',
            user:{
                name: user.name,
                email:user.email,
                contact:user.contact,
                address:user.address,
            },
            token,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error!!!. Please Try Again'
        })
    }
}

export const testController=async(req,res)=>{
    try {
        res.send("Protected Route");
    } catch (error) {
        console.log(error);
        res.send({error});
    }
}