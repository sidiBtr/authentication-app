import express from 'express'
import { signin, signup, signWithGoogle, signout } from '../controllers/auth.Controllers.js'
const router = express.Router()

// implement authentication routes
router.post('/signup', signup)
router.post('/signin', signin)
router.post('/google', signWithGoogle)
router.get('/signout', signout)

export default router;