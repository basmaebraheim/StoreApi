"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var products_1 = __importDefault(require("./api/products"));
var orders_1 = __importDefault(require("./api/orders"));
var users_1 = __importDefault(require("./api/users"));
var apiRoutes = express_1.default.Router();
apiRoutes.get('/', function (_req, res) {
    res.json('no data');
});
//api routes 
apiRoutes.use('/products/', products_1.default);
apiRoutes.use('/orders/', orders_1.default);
apiRoutes.use('/users/', users_1.default);
exports.default = apiRoutes;
