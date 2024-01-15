import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },        
    profilePicture: {
        type: String,
        default: 'https://s.hdnux.com/photos/51/23/24/10827008/4/1200x0.jpg'
    }


}, {timestamps: true})

const User = mongoose.model('User', userSchema)
export default User