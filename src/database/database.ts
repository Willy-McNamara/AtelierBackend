import { Sequelize } from 'sequelize'
import dotenv  from 'dotenv'

/*
Establish our connection with the appropriate db inside our local postgres instance.
*/

dotenv.config()

const user = process.env.PSQL_USER as string
const password = process.env.PSQL_PASSWORD as string
const host = process.env.PSQL_HOST as string

export const sequelize = new Sequelize('atelier_db_test', user, password, {
  host: host,
  dialect: 'postgres',
  logging: false
});