import client from '../database' // import the database connection
import { Product } from './product'

export type Order = {
  id?: number
  user_id: string
  status: string
}
export class OrderStore {
  // get all orders
  async index(user_id: string): Promise<Order[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders WHERE user_id=($1)'
      const result = await client.query(sql, [user_id])
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Error in get all order: ${err}`)
    }
  }

  // get order  by order  id
  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Error in find order ${id}: ${err}`)
    }
  }

  // create order
  async create(request: Order): Promise<Order> {
    try {
      const sql = `INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *`
      const conn = await client.connect()
      const result = await conn.query(sql, [request.user_id, request.status])
      const order = result.rows[0]
      conn.release()

      return order
    } catch (err) {
      throw new Error(`Error in create new order: ${err}`)
    }
  }

  // delete order
  async delete(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      const order = result.rows[0]
      conn.release()

      return order
    } catch (err) {
      throw new Error(`Error in delete order: ${err}`)
    }
  }

  // add product 
  async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {

    try {

      const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
      const conn = await client.connect()

      const result = await conn
        .query(sql, [quantity, orderId, productId])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
    }
  }

  // get all orders
  async getProducts(orderId: string): Promise<Product[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM order_products right join products WHERE order_Id=($1)'
      const result = await client.query(sql, [orderId])
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Error in get all order: ${err}`)
    }
  }
}
