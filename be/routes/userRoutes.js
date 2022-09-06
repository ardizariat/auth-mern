import { index } from '../app/controllers/userController.js'
import router from '../config/router.js'
import { auth } from '../app/middleware/verifyToken.js'
router.get('/', auth, index)

export default router
