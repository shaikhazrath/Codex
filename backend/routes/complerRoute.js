import express from 'express'
import { complite } from '../controllers/complierController.js'
const router = express.Router()

router.post('/',complite)

export default router