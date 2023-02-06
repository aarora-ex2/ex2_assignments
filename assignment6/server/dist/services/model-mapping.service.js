"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_data_class_models_1 = __importDefault(require("../models/api-data-class.models"));
function ModelMapping(data) {
    let middleWareResponse = [];
    data.map((item) => {
        let mappedData = new api_data_class_models_1.default(item);
        middleWareResponse.push(mappedData);
    });
    return middleWareResponse;
}
exports.default = ModelMapping;
