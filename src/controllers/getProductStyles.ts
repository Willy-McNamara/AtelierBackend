import { Request, Response } from 'express'
import { Styles, Photos, Skus } from '../database/models'

interface sku {
  id: number,
  size: string,
  quantity: number,
}


export default function getProductStyles(req: Request, res: Response){
  const { product_id } = req.params
  const numProductId = Number(product_id)
  if (Number.isNaN(numProductId)) {
    res.status(400).send('invalid parameter')
  } else {
    queryForSingleProduct(numProductId)
      .then((results) => {
        res.status(200).send(results)
      })
      .catch((err) => {
        res.status(400).send(err)
      })
  }

}

async function queryForSingleProduct (product_id: number) {

  return Styles.findAll({
    where: {
      products_id: product_id
    },
    attributes: [
      'id', 'name', 'sale_price', 'original_price', 'default_style'
    ],
    include: [{
      model: Photos,
      attributes: ['url', 'thumbnail_url']
    },
    {
      model: Skus,
      attributes: ['id', 'size', 'quantity']
    }],
  })
    .then((results: any)=> {
      return results.map((result: any) => {
        const newSkus: {[k: string]: any} = {}
        result.skus.forEach((sku: sku) => {
          newSkus[sku.id]= {quantity: sku.quantity, size: sku.size}
        })
        const returnValue = {
          style_id: result.id,
          name: result.name,
          original_price: result.original_price,
          sale_price: result.sale_price,
          'default?': result.default_style,
          photos: result.photos,
          skus: newSkus
        }
        return returnValue
      })
    })
    .then((styleData) => {
      const result = {
        product_id: product_id,
        results: styleData
      }
      return result
    })
}