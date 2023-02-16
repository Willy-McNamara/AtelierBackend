import fs from "fs";
import papa from "papaparse";
import path from "path";
import { sequelize } from "../../database/database"
import { Products } from "../../database/models/models";

console.log('logging sequelize in database.ts :', sequelize);
console.log('logging Products in database.ts :', Products);

export const parseProducts = () => {
  const filePath = path.join(__dirname, "../rawData/prodTest.csv")
  const readStream = fs.createReadStream(filePath);
  const options = { header: true };
  const parsedStream = papa.parse(papa.NODE_STREAM_INPUT, options);
  readStream.pipe(parsedStream);
  const productData: any = [];

  parsedStream.on("data", (row) => {
    row.id = Number(row.id);
    productData.push(row);
  });

  parsedStream.on("end", () => {
    console.log("Done");
    Products.bulkCreate(productData)
      .then((res) => {console.log('res from bulkCreate :', res)})
      .catch((err) => {
        console.log('here is error in bulkCreate', err)
      })
  });
};
parseProducts()