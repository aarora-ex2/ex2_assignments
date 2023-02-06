import cors from "cors";
import categRoute from "./routes/index.route";
import articleRoute from "./routes/articles.route";
import express from "express";

const app = express();

app.use(cors());

app.use("/", categRoute);
app.use("/articles", articleRoute);

app.listen(3000, () => console.log("Server running on 3000"));
