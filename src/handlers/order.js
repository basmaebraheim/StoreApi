"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.addProduct = exports.create = exports.show = exports.index = void 0;
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
const index = async (req, res) => {
    const orders = await store.index(req.body.user_id);
    res.json(orders);
};
exports.index = index;
const show = async (req, res) => {
    const order = await store.show(req.params.id);
    res.json(order);
};
exports.show = show;
const create = async (req, res) => {
    try {
        const order = {
            user_id: req.body.user_id,
            status: req.body.status
        };
        const neworder = await store.create(order);
        res.json(neworder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.create = create;
const addProduct = async (_req, res) => {
    const orderId = _req.params.id;
    const productId = _req.body.productId;
    const quantity = parseInt(_req.body.quantity);
    try {
        const addedProduct = await store.addProduct(quantity, orderId, productId);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.addProduct = addProduct;
const getProduct = async (_req, res) => {
    const orderId = _req.params.id;
    try {
        const addedProduct = await store.getProducts(orderId);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.getProduct = getProduct;
