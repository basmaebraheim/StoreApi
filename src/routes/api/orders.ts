
import express from 'express'
import { index, show, create, addProduct } from '../../handlers/order'
import checkOrderOpen from '../../middlewares/checkOrderOpen'
import verifyAuthToken from '../../middlewares/verifyAuthToken'

const orderRoutes = express.Router()

orderRoutes.get('/', [verifyAuthToken], index)
orderRoutes.get('/:id', [verifyAuthToken], show)
orderRoutes.post('/', [verifyAuthToken], create)
orderRoutes.post('/:id/products', [verifyAuthToken, checkOrderOpen], addProduct)
orderRoutes.get('/:id/products', [verifyAuthToken, checkOrderOpen], addProduct)



export default orderRoutes