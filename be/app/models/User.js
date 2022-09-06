import { DataTypes } from 'sequelize'
import database from '../../config/database.js'

const User = database.define(
  'users',
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    refreshToken: {
      type: DataTypes.TEXT,
    },
    lastLogin: {
      type: DataTypes.DATE,
    },
  },
  { freezeTableName: true }
)

export default User
