import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletePosto, getPostos, updatePosto } from '../controllers/posto.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getPostos', getPostos)
router.delete('/deletePosto/:PostoId/:userId', verifyToken, deletePosto)
router.put('/updatePosto/:PostoId/:userId', verifyToken, updatePosto)


export default router;