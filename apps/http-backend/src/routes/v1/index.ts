import { Router } from "express"
import userRouer from "./user"
import adminRouter from "./admin"

const router: Router = Router()

router.use('/user',userRouer)
router.use('/admin',adminRouter)

export default router;