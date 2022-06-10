"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var order_1 = require("../../handlers/order");
var checkOrderOpen_1 = __importDefault(require("../../middlewares/checkOrderOpen"));
var verifyAuthToken_1 = __importDefault(require("../../middlewares/verifyAuthToken"));
var orderRoutes = express_1.default.Router();
orderRoutes.get('/', [verifyAuthToken_1.default], order_1.index);
orderRoutes.get('/:id', [verifyAuthToken_1.default], order_1.show);
orderRoutes.post('/', [verifyAuthToken_1.default], order_1.create);
orderRoutes.post('/:id/products', [verifyAuthToken_1.default, checkOrderOpen_1.default], order_1.addProduct);
orderRoutes.get('/:id/products', [verifyAuthToken_1.default, checkOrderOpen_1.default], order_1.addProduct);
exports.default = orderRoutes;
