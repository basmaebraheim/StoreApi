"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.create = exports.show = exports.index = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_1.UserStore();
const index = async (req, res) => {
    const users = await store.index();
    res.json(users);
};
exports.index = index;
const show = async (req, res) => {
    const user = await store.show(req.params.id);
    res.json(user);
};
exports.show = show;
const create = async (req, res) => {
    try {
        const user = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        };
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET || "");
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.create = create;
const authenticate = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const u = await store.authenticate(user.username, user.password);
        const token = jsonwebtoken_1.default.sign({ user: u }, process.env.TOKEN_SECRET || "");
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
};
exports.authenticate = authenticate;
