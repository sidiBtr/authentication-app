import express from 'express'
import User from '../models/userModel.js'
import { getUsers, test, updateUser, deleteUser } from '../controllers/userController.js'
import { get } from 'mongoose'
import { verifyToken } from '../verifyUser.js'
const router = express.Router()

// creating the root route
router.get('/', test)
// get all users
router.get('/users', getUsers)
// update an account
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser )

export default router;