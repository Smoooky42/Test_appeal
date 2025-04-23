import express from 'express'
import router from './routes'
import { errorHandler } from './middlewares/errorHandler'
// import path from 'path';

const app = express()
app.use(express.json())

app.use('/api', router)

// Global error handler (should be after routes)
app.use(errorHandler)

export default app
