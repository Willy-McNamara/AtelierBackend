import { AppDataSource } from "./data-source"
import express from 'express'

// default port for backend
const PORT = 8090

const App = () => {
  const app = express()
  app.use(express.json())

  app.get('/api/v1/hello', async (req, res, next) => {
    res.send('success')
  })
   return app
 }

// Initializes the Datasource for TypeORM
AppDataSource.initialize().then(async () => {
 // Express setup
 const app = App()
  app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
 })
}).catch((err) => {
 console.error(err.stack)
})