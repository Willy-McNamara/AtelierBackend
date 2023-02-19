import fs from "fs";
import papa from "papaparse";
import path from "path";

/*
A helper function that streams the data from our giant .csv files, updates the format (need our id's to be Nums!), and then saves it all to our db in bulk. We return a promise that resolves when the save is complete.

Need to create a new database connection and close it when do to avoid memory leaks.
*/

export const parseData = (file: String, Model: any) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, `./rawData/${file}.csv`)
    const readStream = fs.createReadStream(filePath);
    const options = { header: true };
    const parsedStream = papa.parse(papa.NODE_STREAM_INPUT, options);
    readStream.pipe(parsedStream);
    const data: any = [];

    parsedStream.on("data", (row) => {
      row.id = Number(row.id);
      data.push(row);
    });
    parsedStream.on("end", () => {
      void Model.bulkCreate(data)
        .then(() => {
          console.log(`bulkCreate successful for ${file}`)
          data.length = 0;
          resolve(true);
        })
        .catch((err: any) => {
          console.log('here is error in bulkCreate', err)
          reject(err);
        })
    });
  })
};