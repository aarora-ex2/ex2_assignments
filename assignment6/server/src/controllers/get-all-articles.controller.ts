import { Request, Response } from "express";
import ApiData from "../models/api-data-interface.model";
import fetchAll from "../repositories/fetch.repo";

import Model from "../models/api-data-class.models";
import ModelMapping from "../services/model-mapping.service";

export default async function getAllArticles(req: Request, res: Response) {
  let middleWareResponse: Model[] = [];

  let url: string = `https://stage-api.homluv.com/api/nlc/`;
  url +=
    req.query.type === "category"
      ? `category?pagesize=16&page=${
          req.query.page ? req.query.page : 1
        }&category=${req.query.categ}`
      : `articles?pagesize=16&page=${req.query.page ? req.query.page : 1}`;

  url += req.query.search ? `&search=${req.query.search}` : "";

  const data = (await fetchAll(url)) as ApiData[];
  middleWareResponse = ModelMapping(data);

  res.send(middleWareResponse);
}
