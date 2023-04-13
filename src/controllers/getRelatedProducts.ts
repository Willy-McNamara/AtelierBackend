import { Request, Response } from 'express'
import { RelatedItems } from '../database/models'



export default function getRelatedProducts(req: Request, res: Response){
  const { product_id } = req.params
  const numProductId = Number(product_id)
  if (Number.isNaN(numProductId)) {
    res.status(400).send('invalid parameter')
  } else {
    queryForRelatedProducts(numProductId)
      .then((results) => {
        res.status(200).send(results)
      })
      .catch((err) => {
        res.status(400).send(err)
      })
  }

}

async function queryForRelatedProducts (product_id: number) {

  return RelatedItems.findAll({
    where: {
      current_product_id: product_id
    },
    attributes: [
      'related_product_id'
    ],
  })
  .then((results) => {
    return results.map(result => result.related_product_id)
  })
}

// it'd be nice to type the results im getting from the database.