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
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
class Model {
    constructor(data) {
        this.image = data.image;
        this.title = data.title;
        this.teaser = data.teaser;
        this.author = data.author;
        this.type = data.type;
    }
}
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //let parsedData: string[] = [];
    let middleWareResponse = [];
    let url = `https://stage-api.homluv.com/api/nlc/`;
    url +=
        req.query.type === "category"
            ? `category?pagesize=16&page=${req.query.page ? req.query.page : 1}&category=${req.query.categ}`
            : `articles?pagesize=16&page=${req.query.page ? req.query.page : 1}`;
    url += req.query.search ? `&search=${req.query.search}` : "";
    console.log(url);
    try {
        const response = yield fetch(url);
        const data = yield response.json();
        data.map((item) => {
            let mappedData = new Model(item);
            middleWareResponse.push(mappedData);
        });
    }
    catch (_a) {
        console.log("There is some error fetching data.");
    }
    res.send(middleWareResponse);
}));
app.get("/articles", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://stage-api.homluv.com/api/nlc/detail?title=${req.query.title}`;
    try {
        const response = yield fetch(url);
        const data = yield response.json();
        res.send(data);
    }
    catch (_b) {
        console.log("There is some error fetching data.");
    }
}));
app.listen(3000, () => console.log("Server running on 3000"));
