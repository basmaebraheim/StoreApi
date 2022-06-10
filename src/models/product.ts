import client from '../database' // import the database connection

export type Product = {
  id?: number
  price: number
  name: string
}
export class ProductStore {
  // get all products
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products'
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Error in get all product: ${err}`)
    }
  }

  // get product  by product  id
  async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Error in find product ${id}: ${err}`)
    }
  }

  // create product
  async create(request: Product): Promise<Product> {
    try {
      const sql = `INSERT INTO products (price, name) VALUES($1, $2) RETURNING *`
      const conn = await client.connect()
      const result = await conn.query(sql, [request.price, request.name])
      const product = result.rows[0]
      conn.release()

      return product
    } catch (err) {
      throw new Error(`Error in create new product: ${err}`)
    }
  }

  async fiveMostExpensive(): Promise<{name: string, price: number}[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT name, price FROM products ORDER BY price DESC LIMIT 5'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get products by price: ${err}`)
    } 
  }
  async delete(id: string): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      const product = result.rows[0]
      conn.release()

      return product
    } catch (err) {
      throw new Error(`Error in delete product: ${err}`)
    }
  }
}
