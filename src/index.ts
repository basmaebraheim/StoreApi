import express from 'express'
import apiRoutes from './routes'

const app = express()
const port = 3000

app.use(express.json())

 
// Routes
app.use('/api/', apiRoutes)


// server
app.listen(port, () => {
  console.log(`port ${port}`)
})
export default app
