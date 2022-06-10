import express from 'express'
import jwt from 'jsonwebtoken'

const verifyAuthToken = (req: express.Request, res: express.Response, next: () => void) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader?.split(' ')[1] || ""
        jwt.verify(token, process.env.TOKEN_SECRET || "")
        next()

    } catch (err) {
        res.status(401).json('Access denied, invalid token')
        return
    }
}
export default verifyAuthToken
