import { Request, Response } from 'express'
import { sequelize } from '../database/database'


export default function getProducts(req: Request, res: Response){
  const { product_id } = req.params
  const numProductId = Number(product_id)
  if (Number.isNaN(numProductId)) {
    res.status(400).send('invalid parameter')
  } else {
    queryForSingleProduct(numProductId)
      .then(results => {
        res.status(200).send(results)
      })
      .catch(() => {
        res.status(400).send('invalid parameter')
      })
  }

}

function queryForSingleProduct (product_id: number) {

  const queryString = `
  select row_to_json(prod) as product
from(
  select p.id, p.name, p.slogan, p.description, p.category, p.default_price,
  (select array_agg(feat)
  from (
    select feature, value from features where products_id = ${product_id}
  ) feat
) as features
from products as p where id = ${product_id}) prod;
`
  return sequelize.query(queryString)
    .then((results: any) => {
      return results[0][0].product
    })
    .catch((err: any) => {
      console.log('logging the error in dbRes', err)
    })
}