import jwt from 'jsonwebtoken'

const ACCESS_TOKEN_JWT = process.env.ACCESS_TOKEN_JWT

export const auth = (req, res, next) => {
  const headers = req.headers.authorization
  const accessToken = headers && headers.split(' ')[1]

  if (accessToken === null) return res.sendStatus(401)

  jwt.verify(accessToken, ACCESS_TOKEN_JWT, (err, decode) => {
    if (err) return res.sendStatus(403)

    req.uuid = decode.uuid
    req.name = decode.name
    req.username = decode.username
    req.email = decode.email
    next()
  })
}
