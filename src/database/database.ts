import { Sequelize } from 'sequelize'

export const sequelize: Sequelize = new Sequelize('atelier_db_test', 'user', 'password', { // took out user and password args because i dont have that setup on local Postgres...
  host: "localhost",
  dialect: 'postgres',
  logging: false
})