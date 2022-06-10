"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database")); // import the database connection
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserStore {
    // get all users
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await database_1.default.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Error in get all user: ${err}`);
        }
    }
    // get user  by user  id
    async show(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Error in find user ${id}: ${err}`);
        }
    }
    // create user
    async create(request) {
        try {
            const sql = `INSERT INTO users (username,firstName, lastName, password) VALUES($1, $2, $3, $4) RETURNING *`;
            const conn = await database_1.default.connect();
            const hash = bcrypt_1.default.hashSync(request.password + process.env.BCRYPT_PASSWORD, Number(process.env.SALT_ROUNDS));
            const result = await conn.query(sql, [
                request.username,
                request.firstName,
                request.lastName,
                hash
            ]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Error in create new user: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM users WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Error in delete user: ${err}`);
        }
    }
    async authenticate(username, password) {
        const conn = await database_1.default.connect();
        const sql = 'SELECT password FROM users WHERE username=($1)';
        const result = await conn.query(sql, [username]);
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(password + process.env.BCRYPT_PASSWORD, user.password)) {
                return user;
            }
        }
        return null;
    }
}
exports.UserStore = UserStore;
