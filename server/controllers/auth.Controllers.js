import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {

    try{
        const {username, password, email} = req.body
        const hashedPassword = bcryptjs.hashSync(password, 8)
        const newUser = new User({username, email, password: hashedPassword})
        await newUser.save()
        return res.status(201).json({message: "user created successfully"}) 
         
    } catch(error){
        console.log(error)
        next(error)
    }
}
// sign in route
export const signin = async (req, res, next) => {
    const {email, password} = req.body
    try{
         
        const validUser = await User.findOne({email})
        if(!validUser) return next(errorHandler(404, 'User not found'))
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) return next(errorHandler(401, 'Invalid credentials'))
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET) 
        const {password: userPassword, ...rest} = validUser.toObject()
        return res.cookie('token', token, {httpOnly: true}).status(200).json(rest)

    }catch(error){
        console.log(error)
        next(errorHandler(500, 'Internal Server Error'));
    }
}
export const signWithGoogle = async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email})
    if(user){
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        const {password: hashedPassword, ...rest} = user.toObject()
       return  res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)
    } else {
        const generatedPassword = Math.random().toString(36).slice(-8)
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
        const newUser = new User({username: req.body.name.split(" ").join("").toLowerCase() + (Math.floor(Math.random() * 1000)).toString() , email: req.body.email, password: hashedPassword, profilePicture: req.body.photoURL})
        await newUser.save()
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET)
        const {password: hashedPassword2, ...rest} = newUser.toObject()
        return res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json(rest)
    }
    } catch(error){
        next(error)
    }
    
}
export const signout = async (req, res) => {
    return res.clearCookie('access_token').status(200).json('sign out successfully')
}