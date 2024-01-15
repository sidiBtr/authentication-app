import User from "../models/userModel.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'; 

export const test = (req, res) => {
    return res.json({message: 'api is working'})
}
// get all users in the database
export const getUsers = async (req, res) => {
    try{
        const users = await User.find({})
        return res.status(201).json({count: users.length, data: users})
    } catch(error){
        return res.status(500).send({message: error.message})
    }
}

// update user
export const updateUser = async (req, res, next) => {
    if(req.user.id != req.params.id){
        return next(errorHandler(401, 'you can update your account'))
    }
    try{
        if(req.body.password){
            req.body.password =  bcryptjs.hash(req.body.password, 12)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePicture: req.body.profilePicture
            },
        }, {new: true})
        const {password, ...rest} = updatedUser.toObject();
        res.status(200).json(rest)
    } catch(error){
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    if(req.user.id != req.params.id){
        return next(errorHandler(401, 'you can only delete your accountn'))
    }
    try{
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json('user has been deleted')
    } catch(error){
        next(error)
    }
}