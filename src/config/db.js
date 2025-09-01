import mongoose from 'mongoose'
import 'dotenv/config'

const db = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})

		console.log(`MongoDB Connected: ${conn.connection.host}`)
		return conn
	} catch (error) {
		console.error('Database connection error:', error)
		throw error
	}
}

export default db
