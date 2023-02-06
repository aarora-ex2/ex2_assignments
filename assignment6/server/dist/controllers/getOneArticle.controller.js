"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiData_model_1 = require("../models/apiData.model");
const fetch_repo_1 = __importDefault(require("../repositories/fetch.repo"));
function getOneArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://stage-api.homluv.com/api/nlc/detail?title=${req.query.title}`;
        let middleWareResponse = [];
        console.log(url);
        const data = (yield (0, fetch_repo_1.default)(url));
        data.map((item) => {
            let mappedData = new apiData_model_1.Model(item);
            middleWareResponse.push(mappedData);
        });
        res.send(middleWareResponse);
    });
}
exports.default = getOneArticle;
