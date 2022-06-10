"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database")); // import the database connection
class OrderStore {
    // get all orders
    async index(user_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';
            const result = await database_1.default.query(sql, [user_id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Error in get all order: ${err}`);
        }
    }
    // get order  by order  id
    async show(id) {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Error in find order ${id}: ${err}`);
        }
    }
    // create order
    async create(request) {
        try {
            const sql = `INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *`;
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [request.user_id, request.status]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Error in create new order: ${err}`);
        }
    }
    // delete order
    async delete(id) {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Error in delete order: ${err}`);
        }
    }
    // add product 
    async addProduct(quantity, orderId, productId) {
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn
                .query(sql, [quantity, orderId, productId]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
        }
    }
    // get all orders
    async getProducts(orderId) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM order_products right join products WHERE order_Id=($1)';
            const result = await database_1.default.query(sql, [orderId]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Error in get all order: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
