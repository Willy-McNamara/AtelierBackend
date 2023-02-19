import * as fs from 'fs'
import readline from 'readline'
import path from 'path'
import { Features } from '../../database/models'



export async function featuresLoader( fileName: string ) {
  const filePath = path.join(__dirname, '../rawData/', fileName)
  const fileStream = fs.createReadStream(filePath)
  let data = []
  let promiseArray = []

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    if (line === 'id,product_id,feature,value') {
      continue
    }
    const columns = line.split(/(?!\B"[^"]*),(?![^"]*"\B)/)
    const id = Number(columns[0])
    const products_id = Number(columns[1])
    const feature = columns[2].replaceAll(/^"?|"?$/g, '' )
    let value : string | null = columns[3].replaceAll(/^"?|"?$/g, '' )
    value = value === 'null' ? null : value
    data.push({id, products_id, feature, value})
    if (data.length === 100) {
      promiseArray.push(Features.bulkCreate(data))
      data = []
      // Call bulkCreate & store promise into array
      // Once array == 10000 in size, await Promise.all(array)
      if (promiseArray.length === 500) {
        await Promise.all(promiseArray)
          .then(() => console.log('done'))
        promiseArray = []
      }
    }
  }
  await Features.bulkCreate(data)
    .then(() => console.log('done with rest'))
}