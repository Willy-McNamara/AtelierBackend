import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
   type: "postgres",
   host: "localhost",
   port: 5432,
   database: "atelier_db",
   synchronize: true, // allows us to abstract our queries into OOP syntax (js) instaed of SQL. when prod-ready, switch to false and use DB migrations instead.
   logging: true,
   entities: [
       "src/entity/**/*.ts"
   ],
   migrations: [],
   subscribers: [],
})