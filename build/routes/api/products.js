"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var product_1 = require("../../handlers/product");
var verifyAuthToken_1 = __importDefault(require("../../middlewares/verifyAuthToken"));
var productRoutes = express_1.default.Router();
productRoutes.get('/', [verifyAuthToken_1.default], product_1.index);
productRoutes.get('/:id', [verifyAuthToken_1.default], product_1.show);
productRoutes.post('/', [verifyAuthToken_1.default], product_1.create);
productRoutes.post('/fiveMostExpensive', [verifyAuthToken_1.default], product_1.fiveMostExpensive);
exports.default = productRoutes;
