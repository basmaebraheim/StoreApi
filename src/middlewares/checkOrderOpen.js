"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database")); // import the database connection
const verifyAuthToken = async (_req, res, next) => {
    const orderId = _req.params.id;
    const productId = _req.body.productId;
    try {
        const sql = 'SELECT * FROM orders WHERE id=($1)';
        const conn = await database_1.default.connect();
        const result = await conn.query(sql, [orderId]);
        conn.release();
        const order = result.rows[0];
        if (order.status != "open") {
            throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`);
        }
        next();
    }
    catch (err) {
        res.status(404).json('Order not valid' + err);
    }
};
exports.default = verifyAuthToken;
