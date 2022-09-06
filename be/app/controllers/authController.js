import User from '../models/User.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const ACCESS_TOKEN_JWT = process.env.ACCESS_TOKEN_JWT
const REFRESH_TOKEN_JWT = process.env.REFRESH_TOKEN_JWT

export const register = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body
  try {
    let user = await User.findOne({ where: { username } })
    if (user) res.status(422).json({ message: 'username already exists' })

    user = await User.findOne({ where: { email } })
    if (user) res.status(422).json({ message: 'email already exists' })

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    user = await User.create({
      name,
      username,
      email,
      password: hashPassword,
    })

    const data = {
      uuid: user.uuid,
      name: user.name,
      username: user.username,
      email: user.email,
    }

    res.status(201).json({ message: 'register success', data })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ where: { username } })

    const matchPassword = await bcrypt.compare(password, user.password)
    if (!matchPassword) res.status(400).json({ message: 'wrong password' })

    var data = {
      uuid: user.uuid,
      name: user.name,
      username: user.username,
      email: user.email,
    }

    const lastLogin = new Date()

    const accessToken = jwt.sign(data, ACCESS_TOKEN_JWT, {
      expiresIn: '5s',
    })
    const refreshToken = jwt.sign(data, REFRESH_TOKEN_JWT, {
      expiresIn: '1d',
    })

    await User.update({ refreshToken, lastLogin }, { where: { id: user.id } })

    data.lastLogin = lastLogin

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
    })

    res.status(200).json({ message: 'login success', data, accessToken })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

export const refreshToken = asyncHandler(async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) res.sendStatus(401)

    const user = await User.findOne(
      { attributes: ['uuid', 'name', 'email', 'username', 'refreshToken'] },
      { where: { refreshToken } }
    )

    if (!user) res.sendStatus(403)

    jwt.verify(refreshToken, REFRESH_TOKEN_JWT, (err, decode) => {
      if (err) return res.sendStatus(403)

      const data = {
        uuid: user.uuid,
        name: user.name,
        username: user.username,
        email: user.email,
      }
      const accessToken = jwt.sign(data, ACCESS_TOKEN_JWT, {
        expiresIn: '5s',
      })
      res.status(200).json({ message: 'refresh token success', accessToken })
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export const me = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne(
      { attributes: ['uuid', 'name', 'email', 'username'] },
      { where: { uuid: req.uuid } }
    )
    res.status(200).json({ user })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) res.sendStatus(204)

  try {
    const user = await User.findOne({ where: { refreshToken } })

    if (!user) res.sendStatus(204)

    await User.update({ refreshToken: null }, { where: { id: user.id } })

    res.clearCookie('refreshToken')
    res.status(200).json({ message: 'user logout' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})
