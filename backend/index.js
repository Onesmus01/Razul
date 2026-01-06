import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/dbConfig.js'
import userRouter from './routes/userRouter.js'


const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/user',userRouter)
const PORT = process.env.PORT || 8000

app.get('/',(req,res)=> {
    res.send('API is running...')
})

app.listen(PORT,()=> {console.log(`Server is running on port ${PORT}`)
connectDB()
})