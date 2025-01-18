import { Router } from "express"
import userRouer from "./user"

const router: Router = Router()

router.use('/user',userRouer)

export default router;