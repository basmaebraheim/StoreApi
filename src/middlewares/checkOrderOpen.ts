import express from 'express'
import client from '../database' // import the database connection

const verifyAuthToken = async (_req: express.Request, res: express.Response, next: () => void) => {
  const orderId: string = _req.params.id
  const productId: string = _req.body.productId
  try {
    const sql = 'SELECT * FROM orders WHERE id=($1)'
    const conn = await client.connect()
    const result = await conn.query(sql, [orderId])
    conn.release()
    const order = result.rows[0]

    if (order.status != "open") {
      throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
    }
    next()

  } catch (err) {
    res.status(404).json('Order not valid' + err)
  }
}
export default verifyAuthToken