import { DIRNAME } from "./vars.js";

import express from "express";
import path from "path";

export const app = express();

app.use("/", express.static(path.join(DIRNAME, "/client")));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.set("views", path.join(DIRNAME, "/client/views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/admin", (req, res) => {
    res.render("admin.ejs");
});
