import client from '../database' // import the database connection
import bcrypt from 'bcrypt'

export type User = {
  id?: number
  username: string
  firstName?: string
  lastName?: string
  password: string
}
export class UserStore {
  // get all users
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users'
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Error in get all user: ${err}`)
    }
  }

  // get user  by user  id
  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Error in find user ${id}: ${err}`)
    }
  }

  // create user

  async create(request: User): Promise<User> {
    try {
      const sql = `INSERT INTO users (username,firstName, lastName, password) VALUES($1, $2, $3, $4) RETURNING *`
      const conn = await client.connect()
      const hash = bcrypt.hashSync(
        request.password + process.env.BCRYPT_PASSWORD,
        Number(process.env.SALT_ROUNDS)
      )

      const result = await conn.query(sql, [
        request.username,
        request.firstName,
        request.lastName,
        hash
      ])
      const user = result.rows[0]
      conn.release()

      return user
    } catch (err) {
      throw new Error(`Error in create new user: ${err}`)
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      const user = result.rows[0]
      conn.release()

      return user
    } catch (err) {
      throw new Error(`Error in delete user: ${err}`)
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await client.connect()
    const sql = 'SELECT password FROM users WHERE username=($1)'

    const result = await conn.query(sql, [username])

    if (result.rows.length) {

      const user = result.rows[0]

      if (bcrypt.compareSync(password + process.env.BCRYPT_PASSWORD, user.password)) {
        return user
      }
    }

    return null
  }
}
