import { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'

const store = new OrderStore()

export const index = async (req: Request, res: Response) => {
  const orders = await store.index(req.body.user_id)
  res.json(orders)
}

export const show = async (req: Request, res: Response) => {
  const order = await store.show(req.params.id)
  res.json(order)
}

export const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status
    }

    const neworder = await store.create(order)
    res.json(neworder)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

export const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id
  const productId: string = _req.body.productId
  const quantity: number = parseInt(_req.body.quantity)

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId)
    res.json(addedProduct)
  } catch(err) {
    res.status(400)
    res.json(err)
  }
} 
export const getProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id 

  try {
    const addedProduct = await store.getProducts(orderId)
    res.json(addedProduct)
  } catch(err) {
    res.status(400)
    res.json(err)
  }
} 


