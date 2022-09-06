import User from '../models/User.js'
import asyncHandler from 'express-async-handler'

export const index = asyncHandler(async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['uuid', 'name', 'username', 'email', 'lastLogin'],
    })
    res.status(200).json({ message: 'get users success', data: users })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})
