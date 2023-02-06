import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  let url = `https://randomuser.me/api/?page=${req.query.page}&results=${req.query.results}&seed=abc`;
  const data = await fetch(url);
  const response = await data.json();
  res.json(response);
});

app.listen(3000, async () => {
  console.log("server running on Port 8000");
});
