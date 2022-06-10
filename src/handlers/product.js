"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fiveMostExpensive = exports.create = exports.show = exports.index = void 0;
const product_1 = require("../models/product");
const store = new product_1.ProductStore();
const index = async (req, res) => {
    const products = await store.index();
    res.json(products);
};
exports.index = index;
const show = async (req, res) => {
    const product = await store.show(req.params.id);
    res.json(product);
};
exports.show = show;
const create = async (req, res) => {
    try {
        const product = {
            price: req.body.price,
            name: req.body.name
        };
        const newproduct = await store.create(product);
        res.json(newproduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.create = create;
const fiveMostExpensive = async (_req, res) => {
    const users = await store.fiveMostExpensive();
    res.json(users);
};
exports.fiveMostExpensive = fiveMostExpensive;
