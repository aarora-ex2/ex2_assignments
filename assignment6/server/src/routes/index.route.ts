import express from "express";
import getAllArticles from "../controllers/get-all-articles.controller";

const router = express.Router();

router.get("/", getAllArticles);

export default router;
