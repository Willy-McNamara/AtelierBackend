import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import getProductById from './controllers/getProductById'
import getProductStyles from './controllers/getProductStyles'
import getRelatedProducts from './controllers/getRelatedProducts'

dotenv.config()
const PORT: string = process.env.PORT || '3099'

const app: Express = express()
app.use(cors());
app.use(morgan('dev'))
app.use(express.json())

// routes to controllers here:
app.get('/products/:product_id',  (req: Request, res: Response) => {
  getProductById(req, res)
})
app.get('/products/:product_id/styles',  (req: Request, res: Response) => {
  getProductStyles(req, res)
})
app.get('/products/:product_id/related',  (req: Request, res: Response) => {
  getRelatedProducts(req, res)
})

// Give the server ears
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`)
});