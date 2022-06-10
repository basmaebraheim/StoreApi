import express from 'express' 
import products from './api/products'
import orders from './api/orders'
import users from './api/users'

const apiRoutes = express.Router()

apiRoutes.get('/', (_req, res) => {
  res.json('no data')
}) 

//api routes 
apiRoutes.use('/products/', products) 
apiRoutes.use('/orders/', orders)
apiRoutes.use('/users/', users)


export default apiRoutes
