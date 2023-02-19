import * as fs from 'fs'
import readline from 'readline'
import path from 'path'
import { Photos } from '../../database/models'



export async function photosLoader( fileName: string ) {
  const filePath = path.join(__dirname, '../rawData/', fileName)
  const fileStream = fs.createReadStream(filePath)
  let promiseArray = []
  let data = []

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    if (line === 'id,styleId,url,thumbnail_url') {
      continue
    }
    const columns = line.split(/(?!\B"[^"]*),(?![^"]*"\B)/)
    const id = Number(columns[0])
    const styles_id = Number(columns[1])
    const url = columns[2].replaceAll(/^"?|"?$/g, '' )
    const thumbnail_url = columns[3].replaceAll(/^"?|"?$/g, '' )
    data.push({id, styles_id, url, thumbnail_url})
    if (data.length === 100) {
      promiseArray.push(Photos.bulkCreate(data))
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
  await Photos.bulkCreate(data)
    .then(() => console.log('done with rest'))
}