import * as fs from 'fs'
import readline from 'readline'
import path from 'path'
import { Products } from '../../database/models'



export async function productLoader( fileName: string ) {
  const filePath = path.join(__dirname, '../rawData/', fileName)
  const fileStream = fs.createReadStream(filePath)
  let data = []
  let promiseArray = []


  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  for await (const line of rl) {
    if (line === 'id,name,slogan,description,category,default_price') {
      continue
    }
    const columns = line.split(/(?!\B"[^"]*),(?![^"]*"\B)/)
    const id = Number(columns[0])
    const name = columns[1].replaceAll(/^"?|"?$/g, '' )
    const slogan = columns[2].replaceAll(/^"?|"?$/g, '' )
    const description = columns[3].replaceAll(/^"?|"?$/g, '' )
    const category = columns[4].replaceAll(/^"?|"?$/g, '' )
    const default_price = columns[5]
    data.push({id, name, slogan, description, category, default_price})
    if (data.length === 100) {
      promiseArray.push(Products.bulkCreate(data))
      data = []
      if (promiseArray.length === 500) {
        await Promise.all(promiseArray)
          .then(() => console.log('done'))
        promiseArray = []
      }
    }
  }
  await Products.bulkCreate(data)
    .then(() => console.log('done with rest'))
}