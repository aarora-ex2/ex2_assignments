import { Request, Response } from "express";

const express = require("express");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  const resp = fs.readFileSync("../api/data.json");
  const data = JSON.parse(resp);
  res.render("index", {
    results: data.results,
  });
});

app.post("/", (req: Request, res: Response) => {
  const resp = fs.readFileSync("../api/data.json");
  const data = JSON.parse(resp);
  const newRes = data.results.filter((x: any) => {
    let name = x.name.first + x.name.last;
    let country = x.location.country;
    return (
      name.toLowerCase().includes(req.body.name.toLowerCase()) &&
      country.toLowerCase().includes(req.body.country.toLowerCase())
    );
  });

  newRes.sort(
    (a: { name: { first: string } }, b: { name: { first: string } }) => {
      if (a.name.first > b.name.first) {
        return 1;
      } else {
        return -1;
      }
    }
  );
  req.body.sort === "desc" && newRes.reverse();
  res.render("index", {
    results: newRes,
  });
});

app.listen(3000, async () => {
  const data = await fetch("https://randomuser.me/api/?results=10");
  const resp = await data.json();
  const response = JSON.stringify(resp);
  fs.writeFileSync(path.join("../", "api", "data.json"), response);
  console.log("Server running on 3000");
});
