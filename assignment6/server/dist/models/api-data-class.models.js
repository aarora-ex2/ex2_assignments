"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Model {
    constructor(data) {
        this.image = data.image;
        this.title = data.title;
        this.html = data.html;
        this.teaser = data.teaser;
        this.author = data.author;
        this.type = data.type;
    }
}
exports.default = Model;
