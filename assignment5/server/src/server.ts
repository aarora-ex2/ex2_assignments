import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());

interface ApiData {
  image: string;
  title: string;
  teaser: string;
  author: string;
  type: string;
}
class Model {
  image!: string;
  title!: string;
  teaser!: string;
  author!: string;
  type!: string;

  constructor(data: ApiData) {
    this.image = data.image;
    this.title = data.title;
    this.teaser = data.teaser;
    this.author = data.author;
    this.type = data.type;
  }
}

app.get("/", async (req: Request, res: Response) => {
  let middleWareResponse: Model[] = [];
  let url: string = `https://stage-api.homluv.com/api/nlc/`;
  url +=
    req.query.type === "category"
      ? `category?pagesize=16&page=${
          req.query.page ? req.query.page : 1
        }&category=${req.query.categ}`
      : `articles?pagesize=16&page=${req.query.page ? req.query.page : 1}`;

  url += req.query.search ? `&search=${req.query.search}` : "";

  console.log(url);

  try {
    const response = await fetch(url);
    const data: ApiData[] = await response.json();
    data.map((item: ApiData) => {
      let mappedData = new Model(item);
      middleWareResponse.push(mappedData);
    });
  } catch (err) {
    console.log("There is some error fetching data.", err);
  }
  res.send(middleWareResponse);
});

app.get("/articles", async (req: Request, res: Response) => {
  const url = `https://stage-api.homluv.com/api/nlc/detail?title=${req.query.title}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.send(data);
  } catch {
    console.log("There is some error fetching data.");
  }
});

app.listen(3000, () => console.log("Server running on 3000"));
