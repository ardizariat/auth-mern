import router from '../config/router.js'
import {
  register,
  login,
  refreshToken,
  logout,
  me,
} from '../app/controllers/authController.js'
import { auth } from '../app/middleware/verifyToken.js'

router.get('/me', auth, me)
router.get('/refresh-token', refreshToken)
router.post('/login', login)
router.post('/register', register)
router.delete('/logout', logout)

export default router
