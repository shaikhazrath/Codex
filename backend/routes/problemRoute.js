import express from 'express'
import { createProblem, deleteProblemById, getAllProblems, getProblemById, updateProblemById } from '../controllers/ProblemsController.js'
import { authMiddleware } from '../authMiddleware.js'
const router = express.Router()

router.get('/',getAllProblems)
router.get('/:id',getProblemById)
router.post('/', authMiddleware, createProblem)
router.put('/:id', authMiddleware,updateProblemById)
router.delete('/:id', authMiddleware,deleteProblemById)

export default router