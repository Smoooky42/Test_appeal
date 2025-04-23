import { Router } from 'express'
import appealRouter from './appealRouter'

const router = Router()

router.use('/appeal', appealRouter)

export default router
