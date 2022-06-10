"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = require("../../handlers/user");
var verifyAuthToken_1 = __importDefault(require("../../middlewares/verifyAuthToken"));
var userRoutes = express_1.default.Router();
userRoutes.get('/', [verifyAuthToken_1.default], user_1.index);
userRoutes.get('/:id', [verifyAuthToken_1.default], user_1.show);
userRoutes.post('/', [verifyAuthToken_1.default], user_1.create);
userRoutes.post('/authenticate', user_1.authenticate);
exports.default = userRoutes;
