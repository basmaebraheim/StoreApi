import { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'

const store = new ProductStore()

export const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index()
    res.json(products)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

export const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id)
    res.json(product)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      price: req.body.price,
      name: req.body.name
    }

    const newproduct = await store.create(product)
    res.json(newproduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
export const fiveMostExpensive = async (_req: Request, res: Response) => {
  try {
    const users = await store.fiveMostExpensive()
    res.json(users)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}



