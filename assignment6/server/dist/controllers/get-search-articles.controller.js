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
const express_1 = __importDefault(require("express"));
const fetch_repo_1 = __importDefault(require("../repositories/fetch.repo"));
const api_data_class_models_1 = __importDefault(require("../models/api-data-class.models"));
const app = (0, express_1.default)();
function getSearchArticles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let middleWareResponse = [];
        let url = `https://stage-api.homluv.com/api/nlc/articles?pagesize=16`;
        url += req.query.search ? `&search=${req.query.search}` : "";
        const data = (yield (0, fetch_repo_1.default)(url));
        if (data.length > 0) {
            data.map((item) => {
                let mappedData = new api_data_class_models_1.default(item);
                middleWareResponse.push(mappedData);
            });
            res.send(middleWareResponse);
        }
        res.send({
            title: "No results found",
        });
    });
}
exports.default = getSearchArticles;
