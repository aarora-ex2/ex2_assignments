"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fetchAll_repo_1 = require("../repositories/fetchAll.repo");
const router = express_1.default.Router();
router.get("/", fetchAll_repo_1.fetchAll);
router.get("/articles", fetchAll_repo_1.fetchOne);
module.exports = router;
// router.get("/articles", (req: Request, res: Response) => {
//   res.send("Articles");
// });
