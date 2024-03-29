import JWT from 'jsonwebtoken'
import { comparePassword, hashPassword} from "../helper/authHelper.js"
import userModel from "../model/userModel.js"
export const registerController = async(req,res)=>{

    try {
        const {name,email,phone,password} = req.body

        //validation 
        if(!name){
            return res.send({
                message:'name is required'
            })
        }
        if(!email){
            return res.send({
                message:'email is required'
            })
        }
        if(!phone){
            return res.send({
                message:'phone no  is required'
            })
        }
        if(!password){
            return res.send({
                message:'password is required'
            })
        }
        //checking user
        const existingUser = await userModel.findOne({email})
        //existing user
        if(existingUser){
           return  res.status(200).send({
            success:true,
            message:'user already exist'

            })
        }

        //register user
        const hashedPassword = await hashPassword(password)
        
        //save
        const user = await userModel({name,email,phone,password:hashedPassword}).save();

        res.status(201).send({
            success:true,
            message:'user registered successfully',
            user
        })
       
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in registration',
            error
        })
        
    }

}

//Login Controller
export const loginController =async(req,res)=>{
    try {

        const {email,password} =req.body
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'invalid email or password'
                
            }) 
        }

        //checking user 
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'user not register'

            })
        }

        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'password is incorrect'
            })
        }

        //token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRETKEY,{expiresIn:'5d'})

        res.status(200).send({
            success:true,
            message:'Login successfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                token
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in login',
            error
        })
    }

}