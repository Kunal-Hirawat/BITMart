import userModel from "../models/userModel.js"

export const registerContoller= async(req,res) => {
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
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error Occured. Please Try Again'
        })
    }
}