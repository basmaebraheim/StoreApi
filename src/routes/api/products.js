"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../../handlers/product");
const verifyAuthToken_1 = __importDefault(require("../../middlewares/verifyAuthToken"));
const productRoutes = express_1.default.Router();
productRoutes.get('/', [verifyAuthToken_1.default], product_1.index);
productRoutes.get('/:id', [verifyAuthToken_1.default], product_1.show);
productRoutes.post('/', [verifyAuthToken_1.default], product_1.create);
productRoutes.post('/fiveMostExpensive', [verifyAuthToken_1.default], product_1.fiveMostExpensive);
exports.default = productRoutes;
