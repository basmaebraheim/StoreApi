import { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken'

const store = new UserStore()

export const index = async (req: Request, res: Response) => {
  const users = await store.index()
  res.json(users)
}

export const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id)
  res.json(user)
}

export const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    }

    const newUser = await store.create(user)
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET || "")
    res.json(token)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

export const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  }
  try {
    const u = await store.authenticate(user.username, user.password)
    const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET || "")
    res.json(token)
  } catch (error) {
    res.status(401)
    res.json({ error })
  }
}
