"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database")); // import the database connection
class ProductStore {
    // get all products
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await database_1.default.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Error in get all product: ${err}`);
        }
    }
    // get product  by product  id
    async show(id) {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Error in find product ${id}: ${err}`);
        }
    }
    // create product
    async create(request) {
        try {
            const sql = `INSERT INTO products (price, name) VALUES($1, $2) RETURNING *`;
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [request.price, request.name]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Error in create new product: ${err}`);
        }
    }
    async fiveMostExpensive() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT name, price FROM products ORDER BY price DESC LIMIT 5';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`unable get products by price: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Error in delete product: ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
