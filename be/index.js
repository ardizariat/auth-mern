import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv/config'

import database from './config/database.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()

try {
  await database.authenticate()
  console.log('database connected'.bgCyan)
} catch (error) {
  console.log(`error : ${error}`.red)
}

app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1:3000',
  })
)
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

app.listen(8000, () =>
  console.log('Server running on http://127.0.0.1:8000'.bgGreen)
)
