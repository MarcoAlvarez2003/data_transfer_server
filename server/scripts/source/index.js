import { DIRNAME, PORT } from "./components/constants.js";
import { Server } from "socket.io";
import express from "express";
import http from "http";
import path from "path";
const app = express();
// ? Middlewares
app.use("/", express.static(path.join(DIRNAME, "../../client")));
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
// ? Socket
const server = http.createServer(app);
const socket = new Server(server);
socket.on("connection", (client) => { });
// ? Listening
server.listen(PORT, () => {
    console.log(`listening on port ${PORT} - http://localhost:${PORT}/`);
});
//# sourceMappingURL=index.js.map