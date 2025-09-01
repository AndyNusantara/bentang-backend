import express from 'express'
import cors from 'cors'
import routes from './src/routes/routes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', routes)

app.use((err, req, res, next) => {
	res.status(500).json({ error: err.message })
})

export default app
