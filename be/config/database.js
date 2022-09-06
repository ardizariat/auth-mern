import { Sequelize } from 'sequelize'

const database = new Sequelize('auth', 'root', 'root', {
  host: '127.0.0.1',
  dialect: 'mysql',
})

export default database
