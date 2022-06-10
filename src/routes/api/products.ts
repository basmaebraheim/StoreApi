import express from 'express'
import { index, show, create, fiveMostExpensive } from '../../handlers/product'
import verifyAuthToken from '../../middlewares/verifyAuthToken'

const productRoutes = express.Router()

productRoutes.get('/', [verifyAuthToken], index)
productRoutes.get('/:id', [verifyAuthToken], show)
productRoutes.post('/', [verifyAuthToken], create)
productRoutes.post('/fiveMostExpensive', [verifyAuthToken], fiveMostExpensive)


export default productRoutes