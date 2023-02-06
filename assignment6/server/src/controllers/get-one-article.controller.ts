import { Request, Response } from "express";
import ApiData from "../models/api-data-interface.model";
import fetchAll from "../repositories/fetch.repo";
import Model from "../models/api-data-class.models";

export default async function getOneArticle(req: Request, res: Response) {
  const url = `https://stage-api.homluv.com/api/nlc/detail?title=${req.query.title}`;
  let middleWareResponse: Model[] = [];

  console.log(url);

  const data = (await fetchAll(url)) as ApiData[];
  data.map((item: ApiData) => {
    let mappedData = new Model(item);
    middleWareResponse.push(mappedData);
  });
  res.send(middleWareResponse);
}
