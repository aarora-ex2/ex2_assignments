"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const fetch_repo_1 = require("../repositories/fetch.repo");
exports.router = express_1.default.Router();
exports.router.get("/", fetch_repo_1.fetchAll);
module.exports = exports.router;
