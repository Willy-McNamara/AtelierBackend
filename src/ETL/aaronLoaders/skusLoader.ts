import * as fs from 'fs'
import readline from 'readline'
import path from 'path'
import { Skus } from '../../database/models'



export async function skusLoader( fileName: string ) {
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
    if (line === 'id,styleId,size,quantity') {
      continue
    }
    const columns = line.split(/(?!\B"[^"]*),(?![^"]*"\B)/)
    const id = Number(columns[0])
    const styles_id = Number(columns[1])
    const size = columns[2].replaceAll(/^"?|"?$/g, '' )
    const quantity = Number(columns[3])
    data.push({id, styles_id, size, quantity})
    if (data.length === 100) {
      promiseArray.push(Skus.bulkCreate(data))
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
  await Skus.bulkCreate(data)
    .then(() => console.log('done with rest'))
}