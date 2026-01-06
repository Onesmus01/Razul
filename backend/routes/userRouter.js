import express from 'express'
import { subscribeNewsletter, getSubscribers } from '../controllers/NewsLetter.js';
const userRouter = express.Router()

userRouter.post('/subscribe',subscribeNewsletter)
userRouter.get('/get-subscribers',getSubscribers)
export default userRouter

