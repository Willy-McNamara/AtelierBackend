import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

dotenv.config()
const PORT: string = process.env.PORT || '3099'

const app: Express = express()
app.use(cors());
app.use(morgan('dev'))
app.use(express.json())

// routes to controllers here:

// Give the server ears
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`)
});