
import express from 'express'
import { index, show, create, authenticate } from '../../handlers/user'
import verifyAuthToken from '../../middlewares/verifyAuthToken'

const userRoutes = express.Router()

userRoutes.get('/', [verifyAuthToken], index)
userRoutes.get('/:id', [verifyAuthToken], show)
userRoutes.post('/', create)
userRoutes.post('/authenticate', authenticate)


export default userRoutes