import * as fs from 'fs'
import readline from 'readline'
import path from 'path'
import { Styles } from '../../database/models'



export async function stylesLoader( fileName: string ) {
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
    if (line === 'id,productId,name,sale_price,original_price,default_style') {
      continue
    }
    const columns = line.split(/(?!\B"[^"]*),(?![^"]*"\B)/)
    const id = Number(columns[0])
    const products_id = Number(columns[1])
    const name = columns[2].replaceAll(/^"?|"?$/g, '' )
    const sale_price = columns[3] === 'null' ? '0' : columns[3]
    const original_price = columns[4]
    const default_style =  columns[5] === '1'
    data.push({id, products_id, name, sale_price, original_price, default_style})
    if (data.length === 100) {
      promiseArray.push(Styles.bulkCreate(data))
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
  await Styles.bulkCreate(data)
    .then(() => console.log('done with rest'))
}