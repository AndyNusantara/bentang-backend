import app from './app.js'
import db from './src/config/db.js'
const PORT = 3001

db()

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
