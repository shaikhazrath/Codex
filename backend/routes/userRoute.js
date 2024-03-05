import express from 'express';
import { auth, verifyOTPUser } from '../controllers/userController.js';
const router = express.Router();
import { authMiddleware } from '../authMiddleware.js'

router.post('/auth',auth)
router.post('/verify',verifyOTPUser)
router.get('/checktoken',authMiddleware,(req,res)=>{
    return res.json({role : req.isAdmin})
})

export default router