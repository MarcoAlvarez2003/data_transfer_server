import { DIRNAME } from "./constants.js";
import express from "express";
import path from "path";
export const app = express();
app.use("/", express.static(path.join(DIRNAME, "/client")));
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
//# sourceMappingURL=server.js.map