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
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    const resp = fs.readFileSync("../api/data.json");
    const data = JSON.parse(resp);
    res.render("index", {
        results: data.results,
    });
});
app.post("/", (req, res) => {
    const resp = fs.readFileSync("../api/data.json");
    const data = JSON.parse(resp);
    const newRes = data.results.filter((x) => {
        let name = x.name.first + x.name.last;
        let country = x.location.country;
        return (name.toLowerCase().includes(req.body.name.toLowerCase()) &&
            country.toLowerCase().includes(req.body.country.toLowerCase()));
    });
    newRes.sort((a, b) => {
        if (a.name.first > b.name.first) {
            return 1;
        }
        else {
            return -1;
        }
    });
    req.body.sort === "desc" && newRes.reverse();
    res.render("index", {
        results: newRes,
    });
});
app.listen(3000, () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch("https://randomuser.me/api/?results=10");
    const resp = yield data.json();
    const response = JSON.stringify(resp);
    fs.writeFileSync(path.join("../", "api", "data.json"), response);
    console.log("Server running on 3000");
}));
