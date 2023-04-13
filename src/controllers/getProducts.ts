import { Request, Response } from 'express'
import { sequelize } from '../database/database'
export default function getProducts(req: Request, res: Response){
  const {page, count} = req.query
  if (page !== undefined) {
   if (Number.isNaN(Number(page)) ) {
     res.status(400).send('invalid parameter')
     return
   }

  }
  if (count !== undefined) {
   if (Number.isNaN(Number(count)) ) {
     res.status(400).send('invalid parameter')
     return
   }

  }
  const numberPage = Number(page) || undefined
  const numberCount = Number(count) || undefined
  queryProducts(numberPage, numberCount)
  .then((results) => {
    res.status(200).send(results[0])
  })
  .catch(() => {
    res.status(400).send('invalid parameter')
  })
}




function queryProducts(page = 1, count = 5) {
  const end_id = count  * page
  const start_id = (end_id - count) + 1
  const queryString = `SELECT id, name, slogan, description, category, default_price FROM products WHERE id >= ${start_id} AND id <= ${end_id}`
  return sequelize.query(queryString)
    .then(results => {
      return results
    })
}