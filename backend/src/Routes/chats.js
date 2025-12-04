import express from 'express'
import { getStreamToken } from '../Controller/chat.js';
import {protectRoute} from '../Middleware/auth.js'

const router=express.Router()

router.get('/token',protectRoute,getStreamToken)
// getStreamToken this will be made in a controller

export default router;
