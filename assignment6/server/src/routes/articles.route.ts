import express from "express";
import getOneArticle from "../controllers/get-one-article.controller";

const router = express.Router();

router.get("/", getOneArticle);

export default router;
